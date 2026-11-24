<template>
  <dialog
    ref="dialog"
    class="welcome-dialog"
    aria-labelledby="welcome-title"
    aria-describedby="welcome-description"
    @close="closeWelcome"
    @click="closeOnBackdrop"
  >
    <div class="welcome-dialog__bar">
      <span class="welcome-dialog__dots" aria-hidden="true"><i /><i /><i /></span>
      <span>{{ copy.visitor.windowTitle }}</span>
      <button type="button" class="welcome-dialog__close" :aria-label="copy.visitor.close" @click="dialog?.close()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="welcome-dialog__body bg-grid">
      <p class="welcome-dialog__label">{{ copy.visitor.greeting }}</p>
      <h2 id="welcome-title" class="welcome-dialog__title">
        {{ copy.visitor.title }}<span class="text-primary">.</span>
      </h2>
      <p id="welcome-description" class="welcome-dialog__text">{{ copy.visitor.description }}</p>
    </div>
    <div class="welcome-dialog__footer">
      <span class="welcome-dialog__status">
        <span class="welcome-dialog__dot" aria-hidden="true" />
        {{ copy.visitor.status }}
      </span>
      <button type="button" class="button button--primary" autofocus @click="dialog?.close()">
        {{ copy.visitor.action }}
        <ButtonArrow />
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const { copy } = usePortfolioLocale()
const { closeWelcome } = useVisitor()
const dialog = ref<HTMLDialogElement | null>(null)

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) {
    dialog.value?.close()
  }
}

onMounted(() => {
  dialog.value?.showModal()
})
</script>

<style scoped>
.welcome-dialog {
  width: min(520px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  overflow: auto;
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-card);
  background: var(--color-card);
  color: var(--color-text);
  box-shadow: var(--shadow-lift), 0 24px 60px rgba(0, 0, 0, 0.6);
  animation: welcome-in var(--duration-transform) ease-out;
}

.welcome-dialog::backdrop {
  background: rgba(8, 8, 8, 0.72);
  backdrop-filter: blur(4px);
}

.welcome-dialog__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 20px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-chip);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.welcome-dialog__dots {
  display: inline-flex;
  gap: 6px;
}

.welcome-dialog__dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-line-strong);
}

.welcome-dialog__dots i:last-child {
  background: var(--color-primary-border);
}

.welcome-dialog__close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-left: auto;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--duration-color) ease, border-color var(--duration-color) ease;
}

.welcome-dialog__close svg {
  width: 16px;
  height: 16px;
}

.welcome-dialog__close:hover {
  border-color: var(--color-line-strong);
  color: var(--color-text);
}

.welcome-dialog__body {
  padding: 36px 32px 32px;
  border-bottom: 1px solid var(--color-primary-line);
  background-color: var(--color-primary-soft);
}

.welcome-dialog__label {
  margin: 0 0 18px;
  color: var(--color-primary-text);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.welcome-dialog__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  line-height: 1.15;
}

.welcome-dialog__text {
  max-width: 400px;
  margin: 16px 0 0;
  color: var(--color-text-body);
  font-size: var(--text-body);
  line-height: var(--leading-body);
}

.welcome-dialog__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 32px 24px;
}

.welcome-dialog__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.welcome-dialog__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary-border);
  box-shadow: 0 0 10px var(--color-primary-border);
}

@keyframes welcome-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .welcome-dialog__body {
    padding: 28px 20px 24px;
  }

  .welcome-dialog__footer {
    padding: 18px 20px 20px;
  }

  .welcome-dialog__footer .button {
    width: 100%;
    justify-content: center;
  }
}
</style>
