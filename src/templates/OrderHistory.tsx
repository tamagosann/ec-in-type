import React, {
  useCallback,
  useEffect,
} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CardMedia from '@material-ui/core/CardMedia'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../redux/users/selectors'
import { fetchOrderHistory, orderStatusChange } from '../redux/users/operations'
import { SecondaryButton } from '../components/UIKit'
import { CANCEL, DELIVERED, PAID, SENT, UNPAID } from '../common/status'
import { InitialState, Orders } from 'redux/store/initialState'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  position: {
    align: 'center',
  },
  table: {
    minWidth: 500,
  },
  media: {
    width: 130,
    height: 100,
  },
  rootpaper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  rootacording: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
  red: {
    color: '#f50057',
  },
  gray: {
    color: '#808080',
  },
  silver: {
    color: '#C0C0C0',
  },
  message: {
    fontWeight: 'bold',
    fontSize: '18px',
    position: 'relative',
  },
  message2: {
    fontWeight: 'bold',
    fontSize: '20px',
    position: 'relative',
  },
  back: {
    backgroundColor: '#B0C4DE',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  rootsticky: {
    width: 1000,
    overflowX: 'scroll',
    margin: '0 auto',
  },
  container: {
    maxHeight: 750,
  },
  smallfont: {
    fontSize: '14px',
  },
}))

const OrderHistory = () => {
  const classes = useStyles()
  const page = 0
  const rowsPerPage = 10
  const selector = useSelector((state: InitialState) => state)
  const orderHistory: Orders = getOrderHistory(selector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrderHistory())
  }, [])

  const getStatusInJapanese = useCallback((status: number): string | any => {
    if (status === UNPAID) {
      return <span className={classes.red}>未入金</span>
    } else if (status === PAID) {
      return '入金済'
    } else if (status === SENT) {
      return '発送済'
    } else if (status === DELIVERED) {
      return '配送済'
    } else if (status === CANCEL) {
      return <span className={classes.red}>キャンセル済</span>
    }
  }, [])

  return (
    <div>
      {orderHistory.length === 0 && (
        <div className={classes.message}>注文履歴がありません</div>
      )}
      {orderHistory.length > 0 && (
        <Paper className={classes.rootsticky}>
          <TableContainer component={Paper} className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.back}></StyledTableCell>
                  <StyledTableCell align="center" className={classes.back}>
                    商品
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.back}>
                    お客様情報
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.back}>
                    配送状況
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" className={classes.back}></StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <StyledTableRow key={order.orderId}>
                      {/* <Hidden xsDown> */}
                      <StyledTableCell component="th" scope="row" align="right">
                        <CardMedia
                          className={classes.media}
                          image={order.url}
                          title="Contemplative Reptile"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.status >= 0 && order.status < CANCEL && (
                          <>
                            <TableRow>
                              <StyledTableCell className={classes.message}>
                                {order.productName}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {order.productSize}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className={classes.message2}
                              >
                                × {order.quantity}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                + {order.toppingName}
                              </StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell align="right">
                                消費税
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message
                                }
                              >
                                {Math.floor(
                                  order.amount * 0.1,
                                ).toLocaleString()}{' '}
                                円
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell align="right">
                                小計
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message
                                }
                              >
                                {order.amount.toLocaleString()} 円
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell align="right">
                                合計
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message
                                }
                              >
                                {Math.floor(
                                  order.amount * 1.1,
                                ).toLocaleString()}{' '}
                                円
                              </StyledTableCell>
                            </TableRow>
                          </>
                        )}
                        {order.status === 9 && (
                          <>
                            <TableRow>
                              <StyledTableCell
                                className={
                                  classes.message + ' ' + classes.silver
                                }
                              >
                                {order.productName}
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={classes.silver}
                              >
                                {order.productSize}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className={
                                  classes.message2 + ' ' + classes.silver
                                }
                              >
                                × {order.quantity}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell className={classes.silver}>
                                {order.toppingName}
                              </StyledTableCell>
                              <StyledTableCell
                                className={classes.silver}
                                align="right"
                              ></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={classes.silver}
                              >
                                消費税
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message +
                                  ' ' +
                                  classes.silver
                                }
                              >
                                {Math.floor(
                                  order.amount * 0.1,
                                ).toLocaleString()}{' '}
                                円
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={classes.silver}
                              >
                                小計
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message +
                                  ' ' +
                                  classes.silver
                                }
                              >
                                {order.amount.toLocaleString()} 円
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={classes.silver}
                              >
                                合計
                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={
                                  'text-center history-product-price' +
                                  ' ' +
                                  classes.message +
                                  ' ' +
                                  classes.silver
                                }
                              >
                                {Math.floor(
                                  order.amount * 1.1,
                                ).toLocaleString()}{' '}
                                円
                              </StyledTableCell>
                            </TableRow>
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {(order.status === PAID || order.status === UNPAID) && (
                          <>
                            <TableRow>
                              <StyledTableCell
                                className={
                                  'text-history' + ' ' + classes.position
                                }
                              >
                                注文日 :
                              </StyledTableCell>
                              <StyledTableCell
                                className={
                                  'text-history' + ' ' + classes.position
                                }
                              >
                                {order.orderDate}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                className={'text-history'}
                                align="center"
                                colSpan={2}
                              >
                                <div className={classes.smallfont}>
                                  〒 {order.destinationZipcode}
                                </div>
                                <div className={classes.smallfont}>
                                  {order.destinationAddress}
                                </div>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                className={'text-history'}
                                align="center"
                              >
                                氏名:
                              </StyledTableCell>
                              <StyledTableCell
                                className={'text-history'}
                                align="center"
                              >
                                {order.destinationName}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                className={'text-history'}
                                align="center"
                              >
                                TEL:
                              </StyledTableCell>
                              <StyledTableCell
                                className={'text-history'}
                                align="center"
                              >
                                {order.destinationTel}
                              </StyledTableCell>
                            </TableRow>
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.status !== CANCEL && (
                          <div className={'text-history mb20'}>
                            配達予定日: {order.destinationDate}{' '}
                          </div>
                        )}
                        <div>
                          <div className={classes.message}>
                            {getStatusInJapanese(order.status)}
                          </div>
                        </div>
                        {order.status === UNPAID && (
                          <>
                            <div className={classes.red}>
                              {Math.floor(order.amount * 1.1).toLocaleString()}
                              円(税込)
                            </div>
                            <div className={'mt-20'}>
                              <SecondaryButton
                                label={'注文をキャンセル'}
                                onClick={() =>
                                  dispatch(
                                    orderStatusChange(order.orderId, CANCEL),
                                  )
                                }
                              />
                            </div>
                          </>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  )
}

export default OrderHistory
