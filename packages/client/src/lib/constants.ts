import type { InteractionType } from '@packages/common'
import type { icons } from 'feather-icons'

export const icon_map: Record<InteractionType, keyof typeof icons> = {
  'Known Item Request': 'book',
  'Information Services': 'info',
  'Tech Help': 'cpu',
  'Digital Resources': 'smartphone',
} as const
