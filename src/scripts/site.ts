document.documentElement.classList.add('has-client-script');

const rootElement = document.documentElement;
const freshLoadNeedsTop = rootElement.dataset.freshLoad === 'true';
const visitorTookScrollControl = () =>
	rootElement.dataset.freshLoadCancelled === 'true';
const freshLoadStillNeedsTop = () =>
	freshLoadNeedsTop &&
	window.location.hash.length <= 1 &&
	!visitorTookScrollControl();
const forceFreshLoadToTop = () => {
	if (!freshLoadStillNeedsTop()) return;
	history.scrollRestoration = 'manual';
	window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};
const waitForPageImages = () =>
	Promise.all(
		[...document.images].map(
			(image) =>
				new Promise<void>((resolve) => {
					if (image.complete) {
						resolve();
						return;
					}
					image.addEventListener('load', () => resolve(), { once: true });
					image.addEventListener('error', () => resolve(), { once: true });
				}),
		),
	);
const getFreshLoadSettleDelay = () => {
	const value = getComputedStyle(rootElement)
		.getPropertyValue('--duration-fresh-load-settle')
		.trim();
	const duration = Number.parseFloat(value);

	if (!Number.isFinite(duration)) return 0;
	return value.endsWith('ms') ? duration : duration * 1000;
};
const finishFreshLoadPositioning = async () => {
	forceFreshLoadToTop();
	await Promise.all([waitForPageImages(), document.fonts.ready]);
	forceFreshLoadToTop();
	window.setTimeout(() => {
		forceFreshLoadToTop();
		rootElement.dataset.freshLoadComplete = 'true';
	}, getFreshLoadSettleDelay());
};
const getLocationTarget = () => {
	if (window.location.hash.length <= 1) return null;

	try {
		return document.getElementById(
			decodeURIComponent(window.location.hash.slice(1)),
		);
	} catch {
		return null;
	}
};
const restoreLocationTarget = () => {
	getLocationTarget()?.scrollIntoView({ block: 'start', behavior: 'instant' });
};

forceFreshLoadToTop();
if (freshLoadNeedsTop) {
	if (document.readyState === 'complete') void finishFreshLoadPositioning();
	else window.addEventListener('load', finishFreshLoadPositioning, { once: true });
	window.addEventListener('pageshow', forceFreshLoadToTop);
} else {
	restoreLocationTarget();
	window.addEventListener('load', restoreLocationTarget, { once: true });
	window.addEventListener('pageshow', restoreLocationTarget);
}
window.addEventListener('hashchange', () => {
	history.scrollRestoration = 'manual';
	rootElement.dataset.freshLoadCancelled = 'true';
});

const reverseText = (value: string) => [...value].reverse().join('');

document.querySelectorAll<HTMLAnchorElement>('[data-email-link]').forEach((link) => {
	const local = reverseText(link.dataset.emailLocal ?? '');
	const domain = reverseText(link.dataset.emailDomain ?? '');
	const address = `${local}@${domain}`;

	link.textContent = address;
	link.href = `mailto:${address}`;
});

const navigationToggle = document.querySelector<HTMLButtonElement>(
	'[data-navigation-toggle]',
);
const navigationOverlay = document.querySelector<HTMLElement>(
	'[data-navigation-overlay]',
);

const setNavigationOpen = (open: boolean) => {
	if (!navigationToggle || !navigationOverlay) return;

	const focusWasInside = navigationOverlay.contains(document.activeElement);
	navigationOverlay.dataset.open = String(open);
	navigationOverlay.setAttribute('aria-hidden', String(!open));
	navigationOverlay.toggleAttribute('inert', !open);
	navigationToggle.setAttribute('aria-expanded', String(open));
	navigationToggle.setAttribute(
		'aria-label',
		open
			? navigationToggle.dataset.openLabel ?? ''
			: navigationToggle.dataset.closedLabel ?? '',
	);
	document.documentElement.toggleAttribute('data-navigation-open', open);
	if (!open && focusWasInside) navigationToggle.focus();
};

if (navigationToggle && navigationOverlay) {
	navigationToggle.dataset.closedLabel =
		navigationToggle.getAttribute('aria-label') ?? '';

	navigationToggle.addEventListener('click', () => {
		setNavigationOpen(navigationOverlay.dataset.open !== 'true');
	});

	document.querySelectorAll('.site-header a').forEach((link) => {
		link.addEventListener('click', () => setNavigationOpen(false));
	});

	window.addEventListener('resize', () => {
		if (getComputedStyle(navigationToggle).display === 'none') {
			setNavigationOpen(false);
		}
	}, { passive: true });

	document.addEventListener('click', (event) => {
		if (navigationOverlay.dataset.open !== 'true') return;
		if (
			event.target instanceof Element &&
			(
				event.target.closest('.site-header__inner') ||
				event.target.closest('.site-header__overlay a')
			)
		) {
			return;
		}
		setNavigationOpen(false);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape' || navigationOverlay.dataset.open !== 'true') return;
		event.preventDefault();
		setNavigationOpen(false);
	});
}

const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
const navigationLinks = document.querySelectorAll<HTMLAnchorElement>(
	'[data-navigation-link]',
);

if (siteHeader) {
	const headerScrollThreshold = Number.parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			'--parent-header-scroll-threshold',
		),
	);
	const updateHeaderSurface = () => {
		siteHeader.dataset.scrolled = String(window.scrollY > headerScrollThreshold);
	};

	window.addEventListener('scroll', updateHeaderSurface, { passive: true });
	updateHeaderSurface();
}

if (navigationLinks.length > 0) {
	const internalLinks = [...document.querySelectorAll<HTMLAnchorElement>(
		'[data-navigation-section-link]',
	)];
	const targetIds = [...new Set(
		internalLinks
			.map((link) => link.getAttribute('href')?.slice(1))
			.filter((id): id is string => Boolean(id)),
	)];
	const targets = targetIds
		.map((id) => document.getElementById(id))
		.filter((target): target is HTMLElement => Boolean(target));
	const setActiveNavigation = (id: string) => {
		internalLinks.forEach((link) => {
			const active = link.getAttribute('href') === `#${id}`;
			link.dataset.active = String(active);
			if (active) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		});
	};
	const rootStyles = getComputedStyle(document.documentElement);
	const activeProbeRatio = Number.parseFloat(
		rootStyles.getPropertyValue('--parent-navigation-active-probe-ratio'),
	);
	let navigationFrame = 0;
	const updateActiveNavigation = () => {
		navigationFrame = 0;
		if (targets.length === 0) return;

		const headerBottom = siteHeader?.getBoundingClientRect().bottom ?? 0;
		const visiblePageHeight = Math.max(0, window.innerHeight - headerBottom);
		const probePosition =
			window.scrollY + headerBottom + visiblePageHeight * activeProbeRatio;
		let activeTarget = targets[0];

		targets.forEach((target) => {
			const targetTop = target.getBoundingClientRect().top + window.scrollY;
			if (targetTop <= probePosition) activeTarget = target;
		});
		const finalTarget = targets.at(-1);
		if (
			finalTarget &&
			finalTarget.getBoundingClientRect().top <= window.innerHeight
		) {
			activeTarget = finalTarget;
		}

		setActiveNavigation(activeTarget.id);
	};
	const requestNavigationUpdate = () => {
		if (navigationFrame) return;
		navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
	};

	window.addEventListener('scroll', requestNavigationUpdate, { passive: true });
	window.addEventListener('resize', requestNavigationUpdate, { passive: true });
	window.addEventListener('hashchange', requestNavigationUpdate);
	window.addEventListener('pageshow', requestNavigationUpdate);
	window.addEventListener('load', requestNavigationUpdate, { once: true });
	requestNavigationUpdate();
}

const memberScrollRow = document.querySelector<HTMLElement>(
	'[data-member-scroll-row]',
);
const memberScrollShell = document.querySelector<HTMLElement>(
	'[data-member-scroll-shell]',
);

if (memberScrollRow && memberScrollShell) {
	const updateMemberScrollCue = () => {
		const scrollable = memberScrollRow.scrollWidth > memberScrollRow.clientWidth;
		const atEnd =
			memberScrollRow.scrollLeft + memberScrollRow.clientWidth >=
			memberScrollRow.scrollWidth;

		memberScrollShell.dataset.scrollable = String(scrollable);
		memberScrollShell.dataset.scrollEnd = String(atEnd);
	};

	memberScrollRow.addEventListener('scroll', updateMemberScrollCue, {
		passive: true,
	});
	new ResizeObserver(updateMemberScrollCue).observe(memberScrollRow);
	updateMemberScrollCue();
}

const rocket = document.querySelector<HTMLButtonElement>('[data-rocket]');
const rewardPopup = document.querySelector<HTMLElement>('[data-reward-popup]');
const rewardClose = document.querySelector<HTMLButtonElement>(
	'[data-reward-close]',
);
let launchCount = 0;

const closeReward = () => {
	if (!rocket || !rewardPopup || rewardPopup.dataset.open !== 'true') return;

	rewardPopup.dataset.open = 'false';
	rewardPopup.setAttribute('aria-hidden', 'true');
	rewardPopup.hidden = true;
	rocket.focus();
};

const openReward = () => {
	if (!rewardPopup || !rewardClose) return;

	rewardPopup.hidden = false;
	rewardPopup.dataset.open = 'true';
	rewardPopup.setAttribute('aria-hidden', 'false');
	rewardClose.focus();
};

if (rocket) {
	rocket.addEventListener('click', () => {
		launchCount += 1;
		rocket.classList.remove('rocket--resetting');
		rocket.classList.remove('rocket--launching');
		void rocket.offsetWidth;
		rocket.classList.add('rocket--launching');

		if (launchCount === 1) console.log('🚀 Keep clicking, Big Brain XD...');
		if (launchCount === 2) console.log('🌌 Almost there...');
		if (launchCount === 3) {
			openReward();
			launchCount = 0;
		}
	});

	rocket.addEventListener('animationend', () => {
		rocket.classList.add('rocket--resetting');
		rocket.classList.remove('rocket--launching');
		void rocket.offsetWidth;
		window.requestAnimationFrame(() => {
			rocket.classList.remove('rocket--resetting');
		});
	});
}

rewardClose?.addEventListener('click', closeReward);
rewardPopup?.addEventListener('click', (event) => {
	if (event.target === rewardPopup) closeReward();
});

document.addEventListener('keydown', (event) => {
	if (rewardPopup?.dataset.open !== 'true') return;

	if (event.key === 'Escape') {
		event.preventDefault();
		event.stopImmediatePropagation();
		closeReward();
	}

	if (event.key === 'Tab') {
		event.preventDefault();
		rewardClose?.focus();
	}
});

const gameUnlock = document.querySelector<HTMLButtonElement>(
	'[data-game-unlock]',
);
let gameUnlockCount = 0;

gameUnlock?.addEventListener('click', async () => {
	gameUnlockCount += 1;

	if (gameUnlockCount === 1) {
		console.log('🐍 Seriously Bruh, you think this is a game?');
	}
	if (gameUnlockCount === 2) {
		console.log('🕸️ finally a curious one hmm lets see ...');
	}
	if (gameUnlockCount === 3) {
		console.log('🏴 Task 1: follow __naveen__.pyw');
		console.log('🏴 Task 2: follow https://github.com/GhostInHex-x86');
	}
	if (gameUnlockCount === 4) {
		gameUnlockCount = 0;
		const { openSnakeGame } = await import('./snakeGame');
		openSnakeGame();
	}
});

const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)',
).matches;

const revealImmediately = (element: HTMLElement) => {
	element.dataset.revealInstant = 'true';
	element.dataset.revealed = 'true';
};

const getLayoutTop = (element: HTMLElement) => {
	let top = element.offsetTop;
	let parent = element.offsetParent;

	while (parent instanceof HTMLElement) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}

	return top;
};

const setupReveals = () => {
	if (reducedMotion || !('IntersectionObserver' in window)) {
		revealElements.forEach(revealImmediately);
		return;
	}

	const initialViewportBottom = window.scrollY + window.innerHeight;
	const pendingReveals: HTMLElement[] = [];

	revealElements.forEach((element) => {
		if (getLayoutTop(element) < initialViewportBottom) {
			revealImmediately(element);
			return;
		}

		pendingReveals.push(element);
	});

	const rootMargin = getComputedStyle(document.documentElement)
		.getPropertyValue('--scroll-reveal-root-margin')
		.trim();
	const threshold = Number.parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			'--scroll-reveal-threshold',
		),
	);
	const observerOptions: IntersectionObserverInit = {};

	if (rootMargin) observerOptions.rootMargin = rootMargin;
	if (Number.isFinite(threshold)) observerOptions.threshold = threshold;

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				(entry.target as HTMLElement).dataset.revealed = 'true';
				observer.unobserve(entry.target);
			});
		},
		observerOptions,
	);

	pendingReveals.forEach((element) => revealObserver.observe(element));
};

requestAnimationFrame(setupReveals);
