export async function validatePresence(target, field, value, errorsContainer) {
  if (!target) return;
  if (target.getAttribute("data-validate-presence") == "false") return;


  console.log("should do soething")
  if (value.trim().length === 0) {
    errorsContainer.innerHTML += `<div class="text-sm text-red-500">Can't be blank</div>`
    errorsContainer.classList.remove("hidden");
  };
}
