import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useMemo } from "react"
import { usePortolioInfo } from "../connectors/coins"

const Holdings = ({ holdings, coinIds, setView }) => {
  const portfolioPrices = usePortolioInfo(coinIds)

  // Build a quick lookup map by id
  const infoById = useMemo(() => {
    const map = {}
    for (const c of portfolioPrices.data ?? []) map[c.id] = c
    return map
  }, [portfolioPrices.data])

  if (!portfolioPrices.isSuccess) return null

  const getCoinInfo = (id) => infoById[id]

  // Merge holdings with coin info; never assume coin exists
  const mergedData = holdings.map((h) => {
    const coin = getCoinInfo(h.coinId)
    const price = coin?.current_price ?? 0
    return {
      ...h,
      ...coin, // ok if undefined, spread does nothing
      worth: h.amount * price,
      _missing: !coin,
    }
  })

  // Sort by worth safely
  const sortedData = [...mergedData].sort((a, b) => (b.worth ?? 0) - (a.worth ?? 0))

  const calculateTotals = () => {
    const purchasePrice = holdings.reduce((sum, { purchasePrice }) => sum + (purchasePrice ?? 0), 0)
    const worth = mergedData.reduce((sum, row) => sum + (row.worth ?? 0), 0)
    return { purchasePrice, worth }
  }

  const totals = calculateTotals()

  const formatNumber = (number) =>
    new Intl.NumberFormat("en-GB", { notation: "compact", compactDisplay: "short" }).format(number ?? 0)

  const checkMarketCap = (coin) =>
    (coin?.market_cap ?? 0) > 0 ? coin?.market_cap : (coin?.fully_diluted_valuation ?? 0)

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ border: '4px solid #274472'}}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#274472' }}>
              <TableCell />
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Currency</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Current Price&nbsp;(£)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Amount</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Purchase Price&nbsp;(£)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Current Worth&nbsp;(£)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Size&nbsp;(%)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>Break Even &nbsp;(£)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>P/L &nbsp;(£)</TableCell>
              <TableCell sx={{ color: '#C3E0E5' }} align='center'>P/L &nbsp;(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: '#C3E0E5'}}>
            {sortedData.map((row) => {
              const coin = getCoinInfo(row.coinId)
              const price = coin?.current_price
              const worth = row.worth ?? 0
              const sizePct = totals.worth > 0 ? (worth / totals.worth) * 100 : 0
              const breakEven = row.amount ? (row.purchasePrice / row.amount) : 0
              const pl = worth - (row.purchasePrice ?? 0)
              const plPct = (row.purchasePrice ?? 0) > 0 ? (pl / row.purchasePrice) * 100 : 0

              return (
                <TableRow key={row.coinId} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                  {/* image cell (fix: use TableCell instead of nested TableRow) */}
                  <TableCell>
                    <Box sx={{ p: 1 }}>
                      {/* fall back if no image */}
                      {row.image ? (
                        <img src={row.image} alt={row.coinId} height='48' width='48' />
                      ) : (
                        <Box sx={{ height: 48, width: 48, bgcolor: '#fff', borderRadius: 1, border: '1px solid #aaa' }} />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell component="th" scope="row" sx={{color: '#274472' }}>
                    ${row.symbol ?? '–'}<br />
                    {row.coinId}{row._missing ? " (unsupported)" : ""}
                  </TableCell>

                  <TableCell sx={{color: '#274472' }} align="right">
                    {price != null ? price.toFixed(3) : 'N/A'} {" ||"}<br />
                    {formatNumber(checkMarketCap(coin))}<br />
                    {coin?.price_change_percentage_24h != null ? `${coin.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}
                  </TableCell>

                  <TableCell sx={{color: '#274472' }} align="right">{row.amount}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{(row.purchasePrice ?? 0).toFixed(2)}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{worth.toFixed(2)}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{sizePct.toFixed(2)}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{breakEven.toFixed(3)}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{pl.toFixed(2)}</TableCell>
                  <TableCell sx={{color: '#274472' }} align="right">{plPct.toFixed(2)}%</TableCell>
                </TableRow>
              )
            })}

            <TableRow
              key='total'
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#274472' }}
            >
              <TableCell />
              <TableCell component="th" scope="row" sx={{ color: '#C3E0E5' }}>
                Total
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" sx={{ color: '#C3E0E5' }}>{totals.purchasePrice.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ color: '#C3E0E5' }}>{totals.worth.toFixed(2)}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" sx={{ color: '#C3E0E5' }}>
                {(totals.worth - totals.purchasePrice).toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ color: '#C3E0E5' }}>
                {totals.purchasePrice > 0
                  ? (((totals.worth - totals.purchasePrice) / totals.purchasePrice) * 100).toFixed(2)
                  : '0.00'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Holdings
