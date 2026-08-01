const STORAGE_KEY = 'high-score';
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

type Cell = { x: number; y: number };
let closeActiveGame: ((restoreFocus?: boolean) => void) | null = null;

const readCssNumber = (name: string) =>
	Number.parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(name),
	);

const readCssMilliseconds = (name: string) => {
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim();
	const amount = Number.parseFloat(value);
	return value.endsWith('s') && !value.endsWith('ms') ? amount * 1000 : amount;
};

export const openSnakeGame = () => {
	closeActiveGame?.(false);

	const panel = document.querySelector<HTMLElement>('[data-game-panel]');
	const board = document.querySelector<HTMLElement>('[data-game-board]');
	const scoreElement = document.querySelector<HTMLElement>('[data-game-score]');
	const highScoreElement =
		document.querySelector<HTMLElement>('[data-game-high-score]');
	const closeButton =
		document.querySelector<HTMLButtonElement>('[data-game-close]');
	const unlockButton =
		document.querySelector<HTMLButtonElement>('[data-game-unlock]');

	if (!panel || !board || !scoreElement || !highScoreElement || !closeButton) {
		return;
	}

	const boardSize = readCssNumber('--game-board-cell-count');
	const tickMilliseconds = readCssMilliseconds('--duration-game-tick');
	let snakeX = 5;
	let snakeY = 5;
	let velocityX = 0;
	let velocityY = 0;
	let snakeBody: Cell[] = [{ x: snakeX, y: snakeY }];
	let food: Cell = { x: snakeX, y: snakeY };
	let score = 0;
	let timer: number | undefined;
	let touchStart: Cell | null = null;

	let highScore = Number.parseInt(
		localStorage.getItem(STORAGE_KEY) ?? '0',
		10,
	);
	if (!Number.isFinite(highScore)) highScore = 0;

	const placeFood = () => {
		if (snakeBody.length >= boardSize * boardSize) return false;

		do {
			food = {
				x: Math.floor(Math.random() * boardSize) + 1,
				y: Math.floor(Math.random() * boardSize) + 1,
			};
		} while (snakeBody.some((cell) => cell.x === food.x && cell.y === food.y));

		return true;
	};

	const render = () => {
		board.innerHTML = [
			`<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`,
			...snakeBody.map(
				(cell) =>
					`<div class="head" style="grid-area: ${cell.y} / ${cell.x}"></div>`,
			),
		].join('');
	};

	const stopTimer = () => {
		if (timer !== undefined) window.clearInterval(timer);
		timer = undefined;
	};

	const changeDirection = (key: string) => {
		if (key === 'ArrowUp' && velocityY !== 1) {
			velocityX = 0;
			velocityY = -1;
		} else if (key === 'ArrowDown' && velocityY !== -1) {
			velocityX = 0;
			velocityY = 1;
		} else if (key === 'ArrowLeft' && velocityX !== 1) {
			velocityX = -1;
			velocityY = 0;
		} else if (key === 'ArrowRight' && velocityX !== -1) {
			velocityX = 1;
			velocityY = 0;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeActiveGame?.();
			return;
		}

		if (ARROW_KEYS.includes(event.key)) event.preventDefault();
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (ARROW_KEYS.includes(event.key)) changeDirection(event.key);
	};

	const handleTouchStart = (event: TouchEvent) => {
		if (
			event.target instanceof Element &&
			event.target.closest('[data-game-close]')
		) {
			touchStart = null;
			return;
		}

		const touch = event.changedTouches[0];
		touchStart = touch ? { x: touch.screenX, y: touch.screenY } : null;
		event.preventDefault();
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (
			event.target instanceof Element &&
			event.target.closest('[data-game-close]')
		) {
			touchStart = null;
			return;
		}

		const touch = event.changedTouches[0];
		if (!touch || !touchStart) return;

		const deltaX = touch.screenX - touchStart.x;
		const deltaY = touch.screenY - touchStart.y;
		touchStart = null;

		if (deltaX === 0 && deltaY === 0) return;
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			changeDirection(deltaX > 0 ? 'ArrowRight' : 'ArrowLeft');
		} else {
			changeDirection(deltaY > 0 ? 'ArrowDown' : 'ArrowUp');
		}
		event.preventDefault();
	};

	const handleTouchCancel = () => {
		touchStart = null;
	};

	const handleCloseClick = () => closeActiveGame?.();

	const closeGame = (restoreFocus = true) => {
		stopTimer();
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('keyup', handleKeyUp);
		panel.removeEventListener('touchstart', handleTouchStart);
		panel.removeEventListener('touchend', handleTouchEnd);
		panel.removeEventListener('touchcancel', handleTouchCancel);
		closeButton.removeEventListener('click', handleCloseClick);
		panel.dataset.open = 'false';
		panel.setAttribute('aria-hidden', 'true');
		panel.hidden = true;
		board.replaceChildren();
		closeActiveGame = null;
		if (restoreFocus) unlockButton?.focus();
	};

	closeActiveGame = closeGame;

	const endGame = () => {
		stopTimer();
		window.alert('Game Over! Press OK to go back...');
		closeGame();
	};

	const tick = () => {
		const nextX = snakeX + velocityX;
		const nextY = snakeY + velocityY;
		const moving = velocityX !== 0 || velocityY !== 0;
		const ateFood = nextX === food.x && nextY === food.y;

		if (
			nextX < 1 ||
			nextX > boardSize ||
			nextY < 1 ||
			nextY > boardSize
		) {
			endGame();
			return;
		}

		if (
			moving &&
			snakeBody
				.slice(0, ateFood ? snakeBody.length : -1)
				.some((cell) => cell.x === nextX && cell.y === nextY)
		) {
			endGame();
			return;
		}

		snakeX = nextX;
		snakeY = nextY;
		snakeBody.unshift({ x: snakeX, y: snakeY });
		if (!ateFood) snakeBody.pop();

		if (ateFood) {
			score += 1;
			highScore = score >= highScore ? score : highScore;
			localStorage.setItem(STORAGE_KEY, String(highScore));
			scoreElement.textContent = `Score: ${score}`;
			highScoreElement.textContent = `High Score: ${highScore}`;
			if (!placeFood()) {
				endGame();
				return;
			}
		}

		render();
	};

	scoreElement.textContent = 'Score: 0';
	highScoreElement.textContent = `High Score: ${highScore}`;
	placeFood();
	panel.hidden = false;
	panel.dataset.open = 'true';
	panel.setAttribute('aria-hidden', 'false');
	closeButton.addEventListener('click', handleCloseClick);
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
	panel.addEventListener('touchstart', handleTouchStart, { passive: false });
	panel.addEventListener('touchend', handleTouchEnd, { passive: false });
	panel.addEventListener('touchcancel', handleTouchCancel);
	closeButton.focus();
	timer = window.setInterval(tick, tickMilliseconds);
};
