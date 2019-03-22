<template>
  <div>
    <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #create-project-modal">New project</button>
    <div id="create-project-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Create new project</h2>
        <form @submit.prevent="validate" class="uk-form-stacked" ref="form">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <label class="uk-form-label"><strong>General</strong></label>
              <div class="uk-form-controls">
                <input :class="{'uk-form-danger': errors.has('name')}" class="uk-input" name="name" placeholder="Project name" type="text" v-model="form.name" v-validate="'required'">
              </div>
            </div>
            <div class="uk-margin">
              <ul uk-tab>
                <li class="uk-active"><a @click="descriptionPreview = false">Editor</a></li>
                <li><a @click="descriptionPreview = true">Preview</a></li>
              </ul>
              <textarea class="description uk-textarea" placeholder="Project description" v-if="!descriptionPreview" v-model="form.description"></textarea>
              <div class="description uk-textarea" v-else v-html="compiledDescription"></div>
            </div>
            <div class="uk-margin">
              <input :class="{'uk-form-danger': errors.has('fee')}" class="uk-input uk-width-1-2" id="management-fee" name="fee" placeholder="Management fee (in %)" type="number" v-model.number="form.managementFee" v-validate="'required'">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label"><strong>Estimation types</strong></label>
              <div class="uk-form-controls">
                <div class="uk-grid-small uk-flex-between uk-flex-middle" uk-grid>
                  <div class="uk-width-1-1 uk-flex uk-flex-middle" v-for="(estimation, i) in form.estimationTypes">
                    <input :ref="'estimation-' + i" @keydown.enter.prevent="addEstimationType" class="uk-input uk-width-1-2" placeholder="Estimation type" type="text" v-model="form.estimationTypes[i].name">
                    <button @click.prevent="addEstimationType" class="uk-button uk-margin-small-left uk-button-primary c-icon" v-if="i === form.estimationTypes.length - 1">
                      <span uk-icon="icon: plus"></span>
                    </button>
                    <button @click.prevent="deleteEstimationType(i)" class="uk-button uk-margin-small-left uk-button-danger c-icon" v-if="isAddedEstimationType">
                      <span uk-icon="icon: trash"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label"><strong>Team members</strong></label>
              <div class="uk-form-controls">
                <div class="uk-grid-small uk-flex-between uk-flex-middle" uk-grid>
                  <div class="uk-width-1-1 uk-flex uk-flex-between uk-flex-middle" v-for="(member, i) in form.team">
                    <div class="uk-flex uk-flex-1">
                      <input :ref="'member-' + i" @keydown.enter.prevent="addMember" class="uk-input" placeholder="Member name" type="text" v-model="form.team[i].name">
                      <div class="uk-inline uk-margin-small-left">
                        <button :disabled="!isAddedEstimationType" :style="{pointerEvents: isAddedEstimationType ? 'all' : 'none'}" class="uk-button uk-width-1-1 uk-button-default uk-text-nowrap" type="button">Estimation types</button>
                        <div uk-dropdown="mode: click">
                          <div class="uk-flex uk-flex-column">
                            <label v-for="(type, index) in form.estimationTypes">
                              <input :value="type.name" class="uk-checkbox" type="checkbox" v-if="type.name.length > 0" v-model="form.team[i].estimationTypes"> {{ type.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="uk-width-1-5 uk-flex">
                      <button @click.prevent="addMember" class="uk-button uk-margin-small-left uk-button-primary c-icon" v-if="i === form.team.length - 1">
                        <span uk-icon="icon: plus"></span>
                      </button>
                      <button @click.prevent="deleteMember(i)" class="uk-button uk-margin-small-left uk-button-danger c-icon" v-if="isAddedMember">
                        <span uk-icon="icon: trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <p class="uk-text-right">
          <button @click="cancel()" class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button @click="save()" class="uk-button uk-button-primary" type="button">Save</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  // import marked from 'marked'
  import refs from '~/services/firebase'

  export default {
    name: 'createProject',
    data: () => ({
      descriptionPreview: false,
      formDefaults: {
        estimationType: {
          name: ''
        },
        member: {
          name: '',
          estimationTypes: []
        }
      },
      form: {
        name: '',
        description: '',
        managementFee: '',
        estimationTypes: [],
        team: []
      }
    }),
    computed: {
      isAddedEstimationType () {
        return this.form.estimationTypes[0].name.length > 0
      },
      isAddedMember () {
        return this.form.team[0].name.length > 0
      },
      compiledDescription () {
        return marked(this.form.description, { sanitize: true })
      }
    },
    created () {
      this.form.team.push({
        ...this.formDefaults.member
      })
      this.form.estimationTypes.push({
        ...this.formDefaults.estimationType
      })
    },
    methods: {
      addMember () {
        const team = this.form.team
        if (team[team.length - 1].name.length > 0) {
          this.form.team.push({
            ...this.formDefaults.member
          })
          this.$nextTick(() => {
            this.$refs[`member-${team.length - 1}`][0].focus()
          })
        }
      },
      deleteMember (i) {
        (this.form.team.length === 1) ? this.form.team[0].name = '' : this.form.team.splice(i, 1)
      },
      addEstimationType () {
        const estimationTypes = this.form.estimationTypes
        if (estimationTypes[estimationTypes.length - 1].name.length > 0) {
          this.form.estimationTypes.push({
            ...this.formDefaults.estimationType
          })
          this.$nextTick(() => {
            this.$refs[`estimation-${estimationTypes.length - 1}`][0].focus()
          })
        }
      },
      deleteEstimationType (i) {
        (this.form.estimationTypes.length === 1) ? this.form.estimationTypes[0].name = '' : this.form.estimationTypes.splice(i, 1)
      },
      cancel () {
        this.form.team = [this.formDefaults.member]
        this.form.estimationTypes = [this.formDefaults.estimationType]
        this.form.name = ''
        this.form.description = ''
        this.form.managementFee = ''
      },
      async validate () {
        return await this.$validator.validateAll()
      },
      async save () {
        const isValid = await this.validate()
        if (isValid) {
          UIkit.modal('#create-project-modal').hide()
          refs.projectsRef.add(this.form)
          this.cancel()
        }
        // UIkit.modal('#create-project-modal').hide()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .description {
    overflow: auto;
    min-height: 200px;
    max-height: 200px;
  }
</style>
