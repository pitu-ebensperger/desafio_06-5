import pg from "pg";
import format from "pg-format";
import { appConfig, dbConfig } from "../config/env.js";

const { Pool } = pg;
const pool = new Pool(dbConfig);

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP || appConfig.domainUrl
    : appConfig.domainUrl;

const ALLOWED_ORDER_COLUMNS = [
  "id",
  "nombre",
  "categoria",
  "metal",
  "precio",
  "stock",
];

const parseOrderBy = (orderBy = "stock_ASC") => {
  const [columnRaw = "stock", directionRaw = "ASC"] = String(orderBy).split("_");
  const column = ALLOWED_ORDER_COLUMNS.includes(columnRaw) ? columnRaw : "stock";
  const direction = directionRaw.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return { column, direction };
};

export const getJoyas = async ({ limit, page = 1, order_by } = {}) => {
  const { column, direction } = parseOrderBy(order_by);

  const {
    rows: [{ count }],
  } = await pool.query("SELECT COUNT(*) FROM inventario");
  const total = Number(count) || 0;

  const limitNum = limit ? Math.max(1, Number(limit)) : total || 1;
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const offset = (currentPage - 1) * limitNum;

  const sql = format(
    "SELECT * FROM inventario ORDER BY %I %s LIMIT %s OFFSET %s",
    column,
    direction,
    limitNum,
    offset
  );
  const { rows } = await pool.query(sql);

  return {
    joyas: rows,
    total,
    limit: limitNum,
    page: currentPage,
    total_pages: totalPages,
    order_by: `${column}_${direction}`,
  };
};

export const getJoyasHATEOAS = ({
  joyas = [],
  total = 0,
  limit,
  page,
  total_pages,
  order_by,
}) => ({
  total,
  limit,
  page,
  total_pages,
  next:
    page < total_pages
      ? `${BASE_URL}/joyas?limit=${limit}&page=${page + 1}&order_by=${order_by}`
      : null,
  previous:
    page > 1
      ? `${BASE_URL}/joyas?limit=${limit}&page=${page - 1}&order_by=${order_by}`
      : null,
  results: joyas.map((joya) => ({
    nombre: joya.nombre,
    href: `${BASE_URL}/joyas/${joya.id}`,
  })),
});

export const getJoyasPorFiltros = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  const filtros = [];
  const values = [];

  const addFiltro = (campo, comparador, valor) => {
    values.push(valor);
    filtros.push(`${campo} ${comparador} $${values.length}`);
  };

  if (precio_max) addFiltro("precio", "<=", Number(precio_max));
  if (precio_min) addFiltro("precio", ">=", Number(precio_min));
  if (categoria) addFiltro("categoria", "=", String(categoria));
  if (metal) addFiltro("metal", "=", String(metal));

  let consulta = "SELECT * FROM inventario";
  if (filtros.length) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  const { rows } = await pool.query(consulta, values);
  return rows;
};
