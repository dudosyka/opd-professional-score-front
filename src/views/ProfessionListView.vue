<template>
  <ModalContainer :show-header="true" header-title="Список профессий">
    <div class="content">
      <main>
        <table>
          <tb>
            <td>
              <tr>
                <th class="th-first">Название</th>
              </tr>
              <tr @click="select(key)" :class="{'active': key == selectedProfessionKey}" v-for="(profession, key) in professions">
                <th class="th">{{ profession.name }}</th>
              </tr>
            </td>
          </tb>
        </table>
      </main>
      <aside class="right-side">
        <SmallButton @click="$router.push('/assessment/choose')">Провести оценку</SmallButton>
        <SmallButton @click="$router.push('/assessment/results')">Посмотреть результаты</SmallButton>
        <SmallButton @click="edit">Изменить</SmallButton>
        <SmallButton @click="remove">Удалить</SmallButton>
        <SmallButton @click="add">Добавить профессию</SmallButton>
      </aside>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {ProfessionModel} from "@/api/models/profession.model";

export default {
  name: "ProfessionView",
  components: {SmallButton, ModalContainer},
  data() {
    return {
      professionModel: null,
      professions: [],
      selectedProfession: null,
      selectedProfessionKey: null
    };
  },
  created() {
    this.professionModel = new ProfessionModel();
    this.syncProfessionsList();
  },
  methods: {
    async syncProfessionsList() {
      this.professions = await this.professionModel.getAll();
    },
    select(key) {
      this.$store.commit('setSelectedProfession', this.professions[key]);
      this.selectedProfessionKey = key;
    },
    edit() {
      if (this.selectedProfessionKey)
        this.$router.push('/profession/add')
      else
        this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для изменения!' });
    },
    add() {
      this.$store.commit('setSelectedProfession', null);
      this.$router.push('/profession/add')
    },
    remove() {
      if (this.selectedProfessionKey == null)
        return this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для удаления!' });

      this.professionModel.delete(this.professions[this.selectedProfessionKey].id).then(() => {
        this.$store.dispatch('showPopUp', { success: true, text: "Профессия успешно удалена!" });
        this.syncProfessionsList();
      }).catch(() => {
        this.$store.dispatch('showPopUp', { success: false, text: "Профессия успешно удалена!" });
      })
    }
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 5rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    height: 50vh;
  }

  table{
    background: #EFEFEF;
    border: 2px gray solid;
    border-radius: 25px;
  }
  .th-first{
    width: 400px;
    height: 30px;
    font-size: 1.5rem;
    border-bottom: 2px gray solid;
    padding-bottom: .5rem;
  }
  .th{
    width: 400px;
    height: 30px;
    border-bottom: 2px gray solid;
    cursor: pointer;
  }
  .active {
    background: #a2a2a2;
  }


</style>