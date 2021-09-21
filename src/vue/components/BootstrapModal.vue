<template functional>
  <div class="modal" :id="props.name" tabindex="-1" role="dialog" :aria-labelledby="props.name + 'Label'"
       aria-hidden="true">
    <div class="modal-dialog animated fadeInDown modal-xl" role="document">
      <div class="modal-content h-100">
        <div class="flex-auto">
          <div class="modal-header">
            <button type="button" class="close transition" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <slot name="label" :property="props">
            <div class="modal-label">
              <h3 class="modal-title text-center" :id="props.name + 'Label'">{{props.title}}</h3>
            </div>
          </slot>
        </div>
        <div class="content-container flex-remain">
          <div class="row justify-content-center p-t-40 p-b-10 h-100">
            <div class="col-11">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bootstrap-modal',
    props: {
      name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    }
  }
</script>
