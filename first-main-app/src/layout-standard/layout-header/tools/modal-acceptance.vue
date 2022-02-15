<template>
  <div class="modal">
    <a-modal
      title="功能验收"
      :visible="visible"
      width="720px"
      centered
      :mask-closable="false"
      icon="question-circle"
      @cancel="$emit('update:visible', false)"
    >
      <div>
        <span style="font-weight: 550">致：{{ detail.companyName }}：</span>
        <p>
          感谢贵司的支持和信任。经贵司各部门积极配合，我司已根据贵我双方签订的
          <sw-text-btn>《{{ detail.contracts && detail.contracts[0] }}》</sw-text-btn>
          （“协议”）， 开通并交付【
          <sw-text-btn>{{ detail.systemName }}</sw-text-btn>
          】 （“思为营销云”）服务内容，详见附随服务清单， 敬请贵司对本项目服务对照
          <a :href="detail.featureDetail" target="_blank"><sw-text-btn>合同所附产品功能清单</sw-text-btn></a>
          （点击查看）予以验收。
        </p>
      </div>

      <div style="margin: 20px 0">
        <a-table :columns="columns" :data-source="tableData" :pagination="false" :scroll="{ y: 500 }">
          <template v-slot:menus="menus">
            <div v-for="(menu, i) in menus" :key="menu">
              {{ i + 1 + '. ' + menu }}
            </div>
          </template>
        </a-table>
      </div>
      <div>
        <p>
          您同意，在您完成验收确认时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织，且有权代表贵司进行验收。
          您可以通过营销云管理后台线上点击“确认”按钮完成验收。 您确认后，我们随后将把验收通知通过邮件形式发送到您的邮箱
          <sw-text-btn>{{ detail.email }}</sw-text-btn>
          中。
        </p>
        <p>思为将持续按照协议约定为贵司提供思为营销云的升级服务、技术服务等售后运维服务。</p>
      </div>
      <template v-slot:footer>
        <a-button type="primary" @click="confirm">确认</a-button>
        <a-button @click="handleConfirm">暂不确认</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getChildFieldNames } from '@/utils'
export default {
  props: {
    visible: Boolean,
  },
  data () {
    return {
      columns: [
        {
          title: '一级功能',
          dataIndex: 'name',
        },
        {
          align: 'left',
          title: '二级功能',
          dataIndex: 'secondMenus',
          scopedSlots: { customRender: 'menus' },
        },
        {
          title: '开通时间',
          dataIndex: 'date',
        },
      ],
      tableData: [],
      detail: {
        companyName: null,
        systemName: null,
        featureDetail: null,
        contracts: null,
      },
    }
  },
  mounted () {
    this.getList()
    this.getDetail()
  },
  methods: {
    handleConfirm () {
      this.$emit('update:visible', false)
    },
    getDetail () {
      this.$Api.ACDetail().then(res => {
        if (res.data) this.detail = res.data
      })
    },
    getList () {
      this.$Api.AFList({ appId: null }).then(res => {
        this.tableData = res.data
        this.tableData.forEach(item => {
          let secondMenus = getChildFieldNames(item.child || [])
          secondMenus = [...new Set(secondMenus)]
          item.secondMenus = secondMenus
        })
      })
    },
    confirm () {
      this.$Api.ACConfirm().then(res => {
        if (res.data) {
          this.$message.success('功能验收确认成功，相关协议已发送到您的邮箱中！')
          this.$emit('success', true)
          this.$emit('update:visible', false)
        } else {
          this.$message.warning('确认失败')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
