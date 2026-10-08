/**
 * Envía el formulario a Formspree sin recargar la página y comunica el estado.
 * Sin JavaScript el formulario sigue funcionando como un POST normal.
 */
type State = 'sending' | 'success' | 'error';

const messages: Record<State, string> = {
  sending: 'Enviando tu mensaje...',
  success: 'Gracias, recibí tu mensaje. Te responderé a tu correo.',
  error:
    'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo, o escríbeme al correo.',
};

function setState(form: HTMLFormElement, state: State | null): void {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (status) {
    status.textContent = state ? messages[state] : '';
    status.dataset.state = state ?? '';
  }
  if (button) {
    button.disabled = state === 'sending';
    button.setAttribute('aria-busy', String(state === 'sending'));
  }
}

async function onSubmit(event: SubmitEvent): Promise<void> {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches('[data-contact-form]')) return;
  if (!form.action) return;
  event.preventDefault();
  if (!form.reportValidity()) return;

  setState(form, 'sending');
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(String(response.status));
    form.reset();
    setState(form, 'success');
  } catch {
    setState(form, 'error');
  }
}

document.addEventListener('submit', onSubmit);

export {};
