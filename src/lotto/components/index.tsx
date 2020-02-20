import React, { Suspense } from 'react'
import { LottoRouteAdd } from './lotto-route-add'
import { LottoRouteList } from './lotto-route-list'
import { ZillaInterface } from 'shared/model'
import { ColumnNames } from 'shared/components/column-names'
import { ErrorBoundary } from 'shared/components/error'
import { Loading } from 'shared/components/loading'

export const Lotto: ZillaInterface = () => <>
	<ColumnNames />
	<LottoRouteAdd />
	<ErrorBoundary>
		<Suspense fallback={<Loading />}>
			<LottoRouteList />
		</Suspense>
	</ErrorBoundary>
</>

