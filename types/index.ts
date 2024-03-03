import type { InternalApi } from 'nitropack'
import type { ProductInsert } from '~/server/types'

export type Product = InternalApi['/api/products/:product']['get']

export type ProductRequest = Partial<Omit<ProductInsert, 'storeId'>>

export type Image = InternalApi['/api/images']['get']['data'][0]
