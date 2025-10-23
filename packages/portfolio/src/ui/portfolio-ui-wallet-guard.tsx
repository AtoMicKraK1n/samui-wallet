import type { Wallet } from '@workspace/db/entity/wallet'

import { useDbPreference } from '@workspace/db-react/use-db-preference'
import { useDbWalletLive } from '@workspace/db-react/use-db-wallet-live'
import React, { useMemo } from 'react'

export interface PortfolioUiWalletGuardProps {
  fallback?: React.ReactNode
  render: (props: { wallet: Wallet }) => React.ReactNode
}

export function PortfolioUiWalletGuard({
  fallback = <div>Wallet not selected</div>,
  render,
}: PortfolioUiWalletGuardProps) {
  const [walletId] = useDbPreference('activeWalletId')
  const [accountId] = useDbPreference('activeAccountId')
  const walletLive = useDbWalletLive({ accountId: accountId })

  const wallet = useMemo(() => walletLive.find((item) => item.id === walletId), [walletId, walletLive])

  return wallet ? render({ wallet }) : fallback
}
