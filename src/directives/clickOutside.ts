import { DirectiveBinding } from 'vue';

const handleClickOutside = (
  event: MouseEvent,
  el: HTMLElement,
  binding: DirectiveBinding
): void => {
  if (!el || el.contains(event.target as Node)) {
    return;
  }

  binding?.value?.onClose?.();
};

const clickOutside = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    document.addEventListener('click', (event: MouseEvent) =>
      handleClickOutside(event, el, binding)
    );
  },
  beforeUnmount: (el: HTMLElement, binding: DirectiveBinding) => {
    document.removeEventListener('click', (event: MouseEvent) =>
      handleClickOutside(event, el, binding)
    );
  }
};

export default clickOutside;
