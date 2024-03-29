import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getProducts, getToppings } from '../redux/products/selectors';
import PrimaryButton from '../components/UIKit/PrimaryButton'
import { addToCart } from '../redux/users/operations'
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchToppings } from '../redux/products/operations';
import { SecondaryButton } from '../components/UIKit';
import { InitialState, ProductsList, ProductsListItem, Toppings } from 'redux/store/initialState';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
    },
    rootgrid: {
      flexGrow: 1,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
  }));

  type ProductDetailParams = {
    productId: string
  }

const ProductDetail: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch() 
    const { productId } = useParams<ProductDetailParams>()
    const selector = useSelector((state: InitialState) => state);
    const productsList: ProductsList = getProducts(selector)
    const index: number = productsList.findIndex(selected => selected.productId === productId)
    const chosen: ProductsListItem = productsList[index];
    const toppings: Toppings = getToppings(selector);

    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [toppingId, setToppingId] = useState('');
    const [toppingName, setToppingName] = useState('なし');
    const [toppingPrice, setToppingPrice] = useState(0);

    const handleChangeSelectedSize = (event: ChangeEvent<HTMLInputElement>):void => {
        setSelectedSize(event.target.value);
        if(event.target.value === 'M') {
            const price: number = chosen.size[0].price;
            setSelectedPrice(price);
        } else if (event.target.value === 'L') {
            const price: number = chosen.size[1].price;
            setSelectedPrice(price);
        }
    };
    // 個数
    const handleQuantityChange = (event: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>): void => {
        setQuantity(Number(event.target.value));
    }

    const toppingOnChange = useCallback((e: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>): void => {
        if(e.target.value === 'なし') {
            setToppingName('なし');
            setToppingPrice(0);
            setToppingId('');
        } else {
            setToppingName(String(e.target.value));
            const index: number = toppings.findIndex(topping => {
                return topping.toppingName === e.target.value
            });
            const newToppingPrice: number = toppings[index].price;
            const newToppingId: string = toppings[index].toppingId;
            setToppingPrice(newToppingPrice);
            setToppingId(newToppingId);
        }
    },[toppings, setToppingId, setToppingPrice, setToppingName])

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchToppings());
    },[]);

    useEffect(() => {
        if(chosen) {
            const price = chosen.size[0].price;
            setSelectedPrice(price);
        }
    },[chosen])

    const link = (path: string) => {
        history.push(path);
    };

    if(chosen && toppings) {

        return (
            <Container maxWidth="sm">
                <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                    <h2 className="product-h2">商品詳細</h2>
                    <Grid container spacing={3} style={{ marginBottom: 40,}}>
                        <Grid item xs={12} sm={6}>
                            <img src={chosen.url} alt="商品画像"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom variant="subtitle1" style={{ marginBottom: 40, fontWeight: 'bold', textAlign: 'center'}} >
                                {chosen.productName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {chosen.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">サイズ</h3>
                    <div className={classes.flex} style={{ marginBottom: 40,}}>
                        <FormControl required component='fieldset'>
                        <RadioGroup row >
                            <FormControlLabel value="M" control={<Radio checked={selectedSize === 'M'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[0].size}: ${chosen.size[0].price.toLocaleString()}円`}/>
                            <FormControlLabel value="L" control={<Radio checked={selectedSize === 'L'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[1].size}: ${chosen.size[1].price.toLocaleString()}円`} />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <h3 className="product-h3">個数</h3>
                        <div className="text-center">
                            <FormControl className={classes.formControl} style={{ marginBottom: 20}}>
                                <InputLabel id="demo-simple-select-label">個数</InputLabel>
                                <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quantity}
                        onChange={handleQuantityChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={13}>13</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={17}>17</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            <MenuItem value={19}>19</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                            </FormControl>
                        </div>
                    <Typography style={{textAlign:'center', marginBottom: 30}}>
                        小計: <span style={{fontSize: 18, marginLeft: 10, marginRight: 10}}> {(selectedPrice * quantity).toLocaleString()} </span>円
                    </Typography>
                    <h3 className="product-h3">トッピング</h3>
                    <Grid container justify='center' spacing={0} className={classes.rootgrid} style={{ marginBottom: 40,}}>
                        <Grid key={index} item xs={12} sm={12}>
                            <div className="text-center">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>トッピング</InputLabel>
                                    <Select
                                        value={toppingName}
                                        onChange={(event) => toppingOnChange(event)}
                                    >
                                        <MenuItem value={'なし'}>なし</MenuItem>
                                        {toppings.map(topping => {
                                        return <MenuItem key={topping.toppingId} value={topping.toppingName}>{ topping.toppingName }</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <Typography style={{textAlign: 'center', marginTop: 20}}>価格: <span style={{fontSize: 18, marginLeft: 10, marginRight: 10}}> { toppingPrice.toLocaleString() } </span>円</Typography>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">合計金額</h3>
                    <Typography style={{textAlign: 'center'}}>
                        合計金額（税抜き） <span style={{fontSize: 20, marginLeft: 10, marginRight: 10}}>{((selectedPrice * quantity) + (toppingPrice * quantity)).toLocaleString()}</span>円
                    </Typography>
                    <div className={'text-center'} style={{marginTop: 30, marginBottom: 50}}>
                        <span style={{ display: 'inline-block', marginRight: 30, marginBottom: 30}}>
                            <SecondaryButton label='商品一覧へ戻る' onClick={() => link('/')} />
                        </span>
                        <PrimaryButton label='カートへ追加' onClick={() => dispatch(addToCart(selectedSize, selectedPrice, quantity, toppingId, toppingName, toppingPrice, history, chosen))} ></PrimaryButton>
                    </div>
                </Paper>
            </Container>
        )

    } else {
        return (
        <>
            <p>...少々お待ちください</p>
        </>
        )
    }

}

export default ProductDetail;