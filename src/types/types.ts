export interface VolumeInfo {
	title: string
	authors?: string[]
	description?: string
	imageLinks?: {
		thumbnail?: string
	}
	canonicalVolumeLink?: string
	averageRating?: number
	ratingsCount?: number
}

export interface SaleInfo {
	retailPrice?: {
		amount: number
		currencyCode: string
	}
}

export interface BookItem {
	id: string
	selfLink: string
	volumeInfo: VolumeInfo
	saleInfo: SaleInfo
}

export interface GoogleApiBooks {
	kind: string
	totalItems: number
	items: BookItem[]
}
