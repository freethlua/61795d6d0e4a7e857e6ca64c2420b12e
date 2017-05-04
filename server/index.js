import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import _ from 'lodash';

import { InfoDB, getShopDB } from './db';

const app = new Koa();

const router = new Router()

router.post('/shop', async ctx => {
  const shop_name = ctx.body.shop;
  const db_name = _.snakeCase(shop_name);

  const shopInfo = InfoDB.create({ shop_name, db_name, requests: 0 });

  // success - send back json
  ctx.body = { id: shop.id };
});

router.post('/shop/:shop_id/product', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_details = ctx.body;

  const shopInfo = await InfoDB.findById(shop_id);
  const ShopDB = getShopDB(shopInfo.db_name);

  const product = await ShopDB.create(product_details);

  ctx.body = { id: product.id };

  InfoDB.update({ requests: shop.requests + 1 }, { where: { id: shopInfo.id } });
});


router.put('/shop/:shop_id/product/:product_id', async ctx => {

  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;
  const product = ctx.body;

  const shopInfo = await InfoDB.findById(shop_id);
  const ShopDB = getShopDB(shopInfo.db_name);

  await ShopDB.update(product, { where: { id: product_id } })

  ctx.body = { id: product.id };

  InfoDB.update({ requests: shop.requests + 1 }, { where: { id: shopInfo.id } });
});


router.delete('/shop/:shop_id/product/:product_id', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;

  const shopInfo = await InfoDB.findById(shop_id);
  const ShopDB = getShopDB(shopInfo.db_name);

  ShopDB.destroy({ where: { id: product_id } });

  ctx.body = { id: product_id };

  InfoDB.update({ requests: shop.requests + 1 }, { where: { id: shopInfo.id } });
});



router.get('/shop/:shop_id/products', async ctx => {
  const shop_id = ctx.params.shop_id;

  const shopInfo = await InfoDB.findById(shop_id);
  const ShopDB = getShopDB(shopInfo.db_name);

  const products = await ShopDB.findAll();

  ctx.body = { products };

  InfoDB.update({ requests: shop.requests + 1 }, { where: { id: shopInfo.id } });
});


server.use(bodyparser())
server.use(router.routes())

server.listen(3000)
