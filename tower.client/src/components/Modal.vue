<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title my-3">
            <slot name="modal-title"> </slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            title="Close"
          ></button>
        </div>
        <div class="modal-body bg-body">
          <slot name="modal-body" />
        </div>
      </div>
    </div>
  </div>
</template>