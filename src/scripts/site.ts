document.documentElement.classList.add('has-client-script');

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
	if (!open && focusWasInside) navigationToggle.focus();
};

if (navigationToggle && navigationOverlay) {
	const siteHeader = navigationToggle.closest<HTMLElement>('.site-header');

	navigationToggle.dataset.closedLabel =
		navigationToggle.getAttribute('aria-label') ?? '';

	navigationToggle.addEventListener('click', () => {
		setNavigationOpen(navigationOverlay.dataset.open !== 'true');
	});

	navigationOverlay.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => setNavigationOpen(false));
	});

	window.addEventListener('resize', () => {
		if (getComputedStyle(navigationToggle).display === 'none') {
			setNavigationOpen(false);
		}
	}, { passive: true });

	document.addEventListener('click', (event) => {
		if (navigationOverlay.dataset.open !== 'true') return;
		if (event.target instanceof Node && siteHeader?.contains(event.target)) return;
		setNavigationOpen(false);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape' || navigationOverlay.dataset.open !== 'true') return;
		event.preventDefault();
		setNavigationOpen(false);
	});
}

const faqToggle = document.querySelector<HTMLButtonElement>('[data-faq-toggle]');
const extraFaqs = document.querySelectorAll<HTMLElement>('[data-faq-extra]');

if (faqToggle) {
	const collapsedLabel = faqToggle.textContent?.trim() ?? '';
	const expandedLabel = faqToggle.dataset.expandedLabel ?? '';

	faqToggle.addEventListener('click', () => {
		const expanded = faqToggle.getAttribute('aria-expanded') !== 'true';

		extraFaqs.forEach((card) => {
			card.classList.toggle('faq__card--hidden', !expanded);
		});
		faqToggle.setAttribute('aria-expanded', String(expanded));
		faqToggle.textContent = expanded ? expandedLabel : collapsedLabel;
	});
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

type TouchPoint = { x: number; y: number };
let pageTouchStart: TouchPoint | null = null;

const isMemberRowTouch = (event: TouchEvent) =>
	event.target instanceof Element &&
	Boolean(event.target.closest('[data-member-scroll-row]'));

document.addEventListener(
	'touchstart',
	(event) => {
		if (
			document.querySelector('[data-game-panel][data-open="true"]') ||
			isMemberRowTouch(event)
		) {
			pageTouchStart = null;
			return;
		}

		const touch = event.changedTouches[0];
		pageTouchStart = touch ? { x: touch.screenX, y: touch.screenY } : null;
	},
	{ passive: true },
);

document.addEventListener(
	'touchend',
	(event) => {
		if (
			!pageTouchStart ||
			document.querySelector('[data-game-panel][data-open="true"]') ||
			isMemberRowTouch(event)
		) {
			pageTouchStart = null;
			return;
		}

		const touch = event.changedTouches[0];
		if (!touch) {
			pageTouchStart = null;
			return;
		}

		const deltaX = touch.screenX - pageTouchStart.x;
		const deltaY = touch.screenY - pageTouchStart.y;
		const threshold = Number.parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--navigation-swipe-threshold',
			),
		);
		pageTouchStart = null;

		if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
		if (deltaX > threshold) setNavigationOpen(true);
		if (deltaX < -threshold) setNavigationOpen(false);
	},
	{ passive: true },
);

document.addEventListener('touchcancel', () => {
	pageTouchStart = null;
});

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
		rocket.classList.remove('rocket--launching');
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
