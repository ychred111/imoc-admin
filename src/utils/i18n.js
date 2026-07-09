import i18n from '@/i8n'
export function generateTitle (title) {
  return i18n.global.t('msg.route.' + title)
}
