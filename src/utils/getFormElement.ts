export default function getFormElement(
  formName: string,
  elementName: string
): HTMLInputElement {
  const form = document.forms.namedItem(formName); // Using namedItem for proper type inference

  if (!form) {
    throw new Error(`Form with name "${formName}" not found`);
  }

  const element = form.elements.namedItem(elementName); // Properly access form elements by name

  if (!element || !(element instanceof HTMLInputElement)) {
    throw new Error(
      `Element with name "${elementName}" not found or is not an input`
    );
  }

  return element;
}
