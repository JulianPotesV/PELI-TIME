--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2025-06-07 13:28:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16602)
-- Name: boletos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boletos (
    idboleto integer NOT NULL,
    idventa integer,
    idsilla integer,
    precio integer
);


ALTER TABLE public.boletos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16601)
-- Name: boletos_idboleto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boletos_idboleto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boletos_idboleto_seq OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 227
-- Name: boletos_idboleto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boletos_idboleto_seq OWNED BY public.boletos.idboleto;


--
-- TOC entry 220 (class 1259 OID 16549)
-- Name: funciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funciones (
    idfuncion integer NOT NULL,
    idpelicula integer,
    idsala integer,
    fecha timestamp without time zone
);


ALTER TABLE public.funciones OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16548)
-- Name: funciones_idfuncion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.funciones_idfuncion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.funciones_idfuncion_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 219
-- Name: funciones_idfuncion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.funciones_idfuncion_seq OWNED BY public.funciones.idfuncion;


--
-- TOC entry 216 (class 1259 OID 16535)
-- Name: peliculas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peliculas (
    idpeliculas integer NOT NULL,
    titulo character varying(45),
    descripcion character varying(1000),
    duracion integer,
    clasificacion character varying(45),
    genero character varying(45),
    director character varying(200),
    actores character varying(500),
    edad character varying(255),
    poster character varying(255),
    trailer character varying(255),
    banner character varying(255)
);


ALTER TABLE public.peliculas OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16534)
-- Name: peliculas_idpeliculas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peliculas_idpeliculas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.peliculas_idpeliculas_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 215
-- Name: peliculas_idpeliculas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peliculas_idpeliculas_seq OWNED BY public.peliculas.idpeliculas;


--
-- TOC entry 218 (class 1259 OID 16542)
-- Name: salas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salas (
    idsala integer NOT NULL,
    nombre character varying(45),
    capacidad integer,
    tipo character varying(45)
);


ALTER TABLE public.salas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16541)
-- Name: salas_idsala_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salas_idsala_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.salas_idsala_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 217
-- Name: salas_idsala_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salas_idsala_seq OWNED BY public.salas.idsala;


--
-- TOC entry 222 (class 1259 OID 16566)
-- Name: sillas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sillas (
    idsilla integer NOT NULL,
    idsala integer,
    numeroasiento character varying(45),
    estado character varying(45)
);


ALTER TABLE public.sillas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16565)
-- Name: sillas_idsilla_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sillas_idsilla_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sillas_idsilla_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 221
-- Name: sillas_idsilla_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sillas_idsilla_seq OWNED BY public.sillas.idsilla;


--
-- TOC entry 224 (class 1259 OID 16578)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    idusuario integer NOT NULL,
    nombre character varying(45),
    correo character varying(200),
    contrasena character varying(45),
    rol character varying(45),
    telefono character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16577)
-- Name: usuarios_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_idusuario_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuarios_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_idusuario_seq OWNED BY public.usuarios.idusuario;


--
-- TOC entry 226 (class 1259 OID 16585)
-- Name: venta_boletos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venta_boletos (
    idventa_boletos integer NOT NULL,
    idfuncion integer,
    idusuario integer,
    fechaventa date,
    total integer
);


ALTER TABLE public.venta_boletos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16584)
-- Name: venta_boletos_idventa_boletos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venta_boletos_idventa_boletos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.venta_boletos_idventa_boletos_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 225
-- Name: venta_boletos_idventa_boletos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venta_boletos_idventa_boletos_seq OWNED BY public.venta_boletos.idventa_boletos;


--
-- TOC entry 4724 (class 2604 OID 16605)
-- Name: boletos idboleto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos ALTER COLUMN idboleto SET DEFAULT nextval('public.boletos_idboleto_seq'::regclass);


--
-- TOC entry 4720 (class 2604 OID 16552)
-- Name: funciones idfuncion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funciones ALTER COLUMN idfuncion SET DEFAULT nextval('public.funciones_idfuncion_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 16538)
-- Name: peliculas idpeliculas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peliculas ALTER COLUMN idpeliculas SET DEFAULT nextval('public.peliculas_idpeliculas_seq'::regclass);


--
-- TOC entry 4719 (class 2604 OID 16545)
-- Name: salas idsala; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salas ALTER COLUMN idsala SET DEFAULT nextval('public.salas_idsala_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 16569)
-- Name: sillas idsilla; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sillas ALTER COLUMN idsilla SET DEFAULT nextval('public.sillas_idsilla_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 16581)
-- Name: usuarios idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN idusuario SET DEFAULT nextval('public.usuarios_idusuario_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 16588)
-- Name: venta_boletos idventa_boletos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_boletos ALTER COLUMN idventa_boletos SET DEFAULT nextval('public.venta_boletos_idventa_boletos_seq'::regclass);


--
-- TOC entry 4902 (class 0 OID 16602)
-- Dependencies: 228
-- Data for Name: boletos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boletos (idboleto, idventa, idsilla, precio) FROM stdin;
\.


--
-- TOC entry 4894 (class 0 OID 16549)
-- Dependencies: 220
-- Data for Name: funciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funciones (idfuncion, idpelicula, idsala, fecha) FROM stdin;
\.


--
-- TOC entry 4890 (class 0 OID 16535)
-- Dependencies: 216
-- Data for Name: peliculas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peliculas (idpeliculas, titulo, descripcion, duracion, clasificacion, genero, director, actores, edad, poster, trailer, banner) FROM stdin;
17	Mohana 2	Moana 2, ambientada tres años después de la primera película, muestra a Moana respondiendo a una llamada inesperada de sus ancestros. Esto la lleva a embarcarse en un viaje a los lejanos mares de Oceanía, junto con Maui y un equipo de navegación, adentrándose en aguas peligrosas y desconocidas.	100	2D - Doblada	Infantil/Aventura	Dana Ledoux Miller	Awhimai Fraser, Nicole Scherzinger, Dwayne Johnson	Todo público 	assets/cartelera/mohana.png	https://www.youtube.com/embed/t3C8TrVo0zo?si=nw4LuPUF4h0DgIrH	../assets/seleccionar-asientos/banner-mohana-sala.png
18	Nosferatu	Nosferatu, la película dirigida por Robert Eggers, es una historia gótica que explora la obsesión entre una joven y un vampiro aterrador. La película es descrita como de terror gótico, con un enfoque en el terror y la atmósfera.	122	2D - Latino	Terror/Misterio	Robert Eggers	Bill Skarsgard, Lily Rose Depp, Nicholas Hoult	+18	assets/cartelera/nosferatu.png	https://www.youtube.com/embed/iEbp8QMGzP0?si=6ZhSJpe2Rvd6b3Dr	../assets/seleccionar-asientos/banner-nosferatu-sala.png
16	Mufasa	Conoce a Taka, un leoncito, y su vida da un giro. Aaron Pierre es quien interpreta a Mufasa en la película. La historia de Mufasa es fundamental para entender la trama de 'El Rey León'.	120	2D - Doblada	Aventura/Musical	Barry Jenkins	Aaron Pierre, Blue Ivy, Mads Mikkelsen	Todo público	assets/cartelera/mufasa.png	https://www.youtube.com/embed/glX5xo-E7WQ?si=DEbgU3MZZBKQ2pIl	../assets/seleccionar-asientos/banner-mufasa-sala.png
15	Kraven el cazador	Se centra en el origen de Kraven y su camino hacia convertirse en un cazador implacable. Explora la compleja relación del personaje con su padre, Nikolai Kravinoff, y cómo esta dinámica impulsa su sed de venganza y su obsesión por superarlo, lo que conduce a brutales consecuencias.	127	2D - Doblada	Acción/Ciencia ficción	J. C. Chandor	Aaron Taylor-Johnson, Ariana DeBose, Russell Crowe	+18	assets/cartelera/raven-el-cazador.png	https://www.youtube.com/embed/JoWdhvrkKjo?si=aaJ7dl8J68wTRLAw	../assets/seleccionar-asientos/banner-raven-sala.png
\.


--
-- TOC entry 4892 (class 0 OID 16542)
-- Dependencies: 218
-- Data for Name: salas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salas (idsala, nombre, capacidad, tipo) FROM stdin;
\.


--
-- TOC entry 4896 (class 0 OID 16566)
-- Dependencies: 222
-- Data for Name: sillas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sillas (idsilla, idsala, numeroasiento, estado) FROM stdin;
\.


--
-- TOC entry 4898 (class 0 OID 16578)
-- Dependencies: 224
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (idusuario, nombre, correo, contrasena, rol, telefono) FROM stdin;
1116266669	Julian Potes Villada	julianpotesvillada@gmail.com	123	cliente	317 3811318
\.


--
-- TOC entry 4900 (class 0 OID 16585)
-- Dependencies: 226
-- Data for Name: venta_boletos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venta_boletos (idventa_boletos, idfuncion, idusuario, fechaventa, total) FROM stdin;
\.


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 227
-- Name: boletos_idboleto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boletos_idboleto_seq', 1, false);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 219
-- Name: funciones_idfuncion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funciones_idfuncion_seq', 1, false);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 215
-- Name: peliculas_idpeliculas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peliculas_idpeliculas_seq', 19, true);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 217
-- Name: salas_idsala_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salas_idsala_seq', 1, false);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 221
-- Name: sillas_idsilla_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sillas_idsilla_seq', 1, false);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuarios_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_idusuario_seq', 1, false);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 225
-- Name: venta_boletos_idventa_boletos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venta_boletos_idventa_boletos_seq', 1, false);


--
-- TOC entry 4738 (class 2606 OID 16607)
-- Name: boletos boletos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_pkey PRIMARY KEY (idboleto);


--
-- TOC entry 4730 (class 2606 OID 16554)
-- Name: funciones funciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funciones
    ADD CONSTRAINT funciones_pkey PRIMARY KEY (idfuncion);


--
-- TOC entry 4726 (class 2606 OID 16540)
-- Name: peliculas peliculas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peliculas
    ADD CONSTRAINT peliculas_pkey PRIMARY KEY (idpeliculas);


--
-- TOC entry 4728 (class 2606 OID 16547)
-- Name: salas salas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salas
    ADD CONSTRAINT salas_pkey PRIMARY KEY (idsala);


--
-- TOC entry 4732 (class 2606 OID 16571)
-- Name: sillas sillas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sillas
    ADD CONSTRAINT sillas_pkey PRIMARY KEY (idsilla);


--
-- TOC entry 4734 (class 2606 OID 16583)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 4736 (class 2606 OID 16590)
-- Name: venta_boletos venta_boletos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_boletos
    ADD CONSTRAINT venta_boletos_pkey PRIMARY KEY (idventa_boletos);


--
-- TOC entry 4744 (class 2606 OID 16613)
-- Name: boletos boletos_idsilla_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_idsilla_fkey FOREIGN KEY (idsilla) REFERENCES public.sillas(idsilla) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4745 (class 2606 OID 16608)
-- Name: boletos boletos_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_idventa_fkey FOREIGN KEY (idventa) REFERENCES public.venta_boletos(idventa_boletos) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4739 (class 2606 OID 16555)
-- Name: funciones funciones_idpelicula_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funciones
    ADD CONSTRAINT funciones_idpelicula_fkey FOREIGN KEY (idpelicula) REFERENCES public.peliculas(idpeliculas) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4740 (class 2606 OID 16560)
-- Name: funciones funciones_idsala_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funciones
    ADD CONSTRAINT funciones_idsala_fkey FOREIGN KEY (idsala) REFERENCES public.salas(idsala) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4741 (class 2606 OID 16572)
-- Name: sillas sillas_idsala_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sillas
    ADD CONSTRAINT sillas_idsala_fkey FOREIGN KEY (idsala) REFERENCES public.salas(idsala) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4742 (class 2606 OID 16591)
-- Name: venta_boletos venta_boletos_idfuncion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_boletos
    ADD CONSTRAINT venta_boletos_idfuncion_fkey FOREIGN KEY (idfuncion) REFERENCES public.funciones(idfuncion) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4743 (class 2606 OID 16596)
-- Name: venta_boletos venta_boletos_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta_boletos
    ADD CONSTRAINT venta_boletos_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuarios(idusuario) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-06-07 13:28:16

--
-- PostgreSQL database dump complete
--

