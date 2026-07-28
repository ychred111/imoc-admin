import { ref, nextTick } from 'vue'
import Sortable from 'sortablejs'
import i18n from '@/i18n'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  nextTick(() => {
    if (!tableRef.value) {
      console.error('tableRef 未挂载')
      return
    }

    const el = tableRef.value.$el.querySelector('.el-table__body > tbody')
    if (!el) {
      console.error('未找到 tbody')
      return
    }

    Sortable.create(el, {
      ghostClass: 'sortable-ghost',
      async onEnd (event) {
        const { newIndex, oldIndex } = event

        // ✅ 获取数据（兼容 ref 和普通数组）
        const data = tableData.value ?? tableData

        // ✅ 防御性判断
        if (!data || data.length === 0) {
          ElMessage.warning('数据为空，无法排序')
          return
        }

        if (oldIndex >= data.length || newIndex >= data.length) {
          console.error('索引越界', { oldIndex, newIndex, length: data.length })
          return
        }

        const oldItem = data[oldIndex]
        const newItem = data[newIndex]

        if (!oldItem || !newItem) {
          console.error('数据不存在', { oldItem, newItem })
          return
        }

        // ✅ 获取 ranking 字段
        const initRanking = oldItem.ranking ?? oldItem.rank ?? oldItem.sort
        const finalRanking = newItem.ranking ?? newItem.rank ?? newItem.sort

        if (initRanking === undefined || finalRanking === undefined) {
          console.error('缺少 ranking 字段', oldItem, newItem)
          return
        }

        try {
          await articleSort({ initRanking, finalRanking })

          ElMessage.success({
            message: i18n.global.t('msg.article.sortSuccess'),
            type: 'success'
          })
          tableData.value = []
          // 重新获取数据
          cb && cb()
        } catch (error) {
          ElMessage.error('排序保存失败')
          console.error(error)
        }
      }
    })
  })
}
