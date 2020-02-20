import React, { Suspense } from 'react'
import { Loading } from 'shared/components/loading'
import { ErrorBoundary } from 'shared/components/error'
import { KongRouteAdd } from './kong-route-add'
import { KongRouteList } from './kong-route-list'
import { ZillaInterface } from 'shared/model'
import { ColumnNames } from 'shared/components/column-names'

export const Kong: ZillaInterface = () => <>
	<ColumnNames />
	<KongRouteAdd />
	<ErrorBoundary>
		<Suspense fallback={<Loading />}>
			<KongRouteList />
		</Suspense>
	</ErrorBoundary>
</>


