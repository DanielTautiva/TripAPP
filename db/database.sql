

CREATE TABLE public."Cards" (
    id_card integer NOT NULL,
    id_user integer,
    token text NOT NULL
);


ALTER TABLE public."Cards" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17171)
-- Name: Cards_id_card_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cards_id_card_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cards_id_card_seq" OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 218
-- Name: Cards_id_card_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cards_id_card_seq" OWNED BY public."Cards".id_card;


--
-- TOC entry 227 (class 1259 OID 17241)
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17251)
-- Name: RolesByUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RolesByUser" (
    id integer NOT NULL,
    id_user integer,
    id_role integer
);


ALTER TABLE public."RolesByUser" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17250)
-- Name: RolesByUser_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RolesByUser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RolesByUser_id_seq" OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 228
-- Name: RolesByUser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RolesByUser_id_seq" OWNED BY public."RolesByUser".id;


--
-- TOC entry 226 (class 1259 OID 17240)
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Roles_id_seq" OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 226
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- TOC entry 225 (class 1259 OID 17222)
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    id_trip integer,
    id_wompi text NOT NULL,
    reference text NOT NULL,
    total_amount double precision,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17221)
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_id_seq" OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- TOC entry 223 (class 1259 OID 17196)
-- Name: Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trip" (
    id integer NOT NULL,
    id_user integer,
    id_driver integer,
    start_location text,
    end_location text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    complete_at timestamp(3) without time zone,
    status integer DEFAULT 1
);


ALTER TABLE public."Trip" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17186)
-- Name: TripStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TripStatus" (
    id integer NOT NULL,
    name text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."TripStatus" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17185)
-- Name: TripStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TripStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TripStatus_id_seq" OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 220
-- Name: TripStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TripStatus_id_seq" OWNED BY public."TripStatus".id;


--
-- TOC entry 222 (class 1259 OID 17195)
-- Name: Trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Trip_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Trip_id_seq" OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 222
-- Name: Trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Trip_id_seq" OWNED BY public."Trip".id;


--
-- TOC entry 217 (class 1259 OID 17158)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    fullname text,
    phone_number text NOT NULL,
    photo text,
    password text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    status boolean
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17157)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 231 (class 1259 OID 17279)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17278)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 230
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 4682 (class 2604 OID 17175)
-- Name: Cards id_card; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cards" ALTER COLUMN id_card SET DEFAULT nextval('public."Cards_id_card_seq"'::regclass);


--
-- TOC entry 4690 (class 2604 OID 17244)
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 4692 (class 2604 OID 17254)
-- Name: RolesByUser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolesByUser" ALTER COLUMN id SET DEFAULT nextval('public."RolesByUser_id_seq"'::regclass);


--
-- TOC entry 4688 (class 2604 OID 17225)
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- TOC entry 4685 (class 2604 OID 17199)
-- Name: Trip id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip" ALTER COLUMN id SET DEFAULT nextval('public."Trip_id_seq"'::regclass);


--
-- TOC entry 4683 (class 2604 OID 17189)
-- Name: TripStatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripStatus" ALTER COLUMN id SET DEFAULT nextval('public."TripStatus_id_seq"'::regclass);


--
-- TOC entry 4680 (class 2604 OID 17161)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4693 (class 2604 OID 17282)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4871 (class 0 OID 17172)
-- Dependencies: 219
-- Data for Name: Cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cards" VALUES (1, 1, 'tok_test_90709_96be1ea154037821F509377ABd7328E2');


--
-- TOC entry 4879 (class 0 OID 17241)
-- Dependencies: 227
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Roles" VALUES (1, 'driver', '2024-01-19 02:17:14.638', NULL);
INSERT INTO public."Roles" VALUES (2, 'passenger', '2024-01-19 02:17:32.107', NULL);


--
-- TOC entry 4881 (class 0 OID 17251)
-- Dependencies: 229
-- Data for Name: RolesByUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."RolesByUser" VALUES (1, 2, 1);
INSERT INTO public."RolesByUser" VALUES (2, 3, 1);
INSERT INTO public."RolesByUser" VALUES (3, 1, 2);


--
-- TOC entry 4877 (class 0 OID 17222)
-- Dependencies: 225
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Transaction" VALUES (1, 1, '190709-1705649139-96651', '1705649132656_qgciol', 657300, '2024-01-19 02:25:41.023', NULL);


--
-- TOC entry 4875 (class 0 OID 17196)
-- Dependencies: 223
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Trip" VALUES (1, 1, 2, '4.6266686&-74.1625781', '4.629737547395592&-74.13502282940719', '2024-01-19 02:24:56.828', '2024-01-19 02:25:03.259', 3);


--
-- TOC entry 4873 (class 0 OID 17186)
-- Dependencies: 221
-- Data for Name: TripStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TripStatus" VALUES (1, 'On hold', '2024-01-19 02:20:19.245', NULL);
INSERT INTO public."TripStatus" VALUES (2, 'Accepted trip', '2024-01-19 02:20:19.247', NULL);
INSERT INTO public."TripStatus" VALUES (3, 'Pickup', '2024-01-19 02:20:19.248', NULL);
INSERT INTO public."TripStatus" VALUES (4, 'On the way', '2024-01-19 02:20:19.248', NULL);
INSERT INTO public."TripStatus" VALUES (5, 'Arrival', '2024-01-19 02:20:19.249', NULL);


--
-- TOC entry 4869 (class 0 OID 17158)
-- Dependencies: 217
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES (1, 'july@example.com', 'July Daza', '+57 3013412329', NULL, '$2b$10$87yu4Lr33v2Uh4K5zKQyVOXnhaALczP68vxYF0EjG79ScnSdcNg9W', '2024-01-19 02:04:49.415', NULL, NULL);
INSERT INTO public."User" VALUES (2, 'driver@example.com', 'Daniel Tautiva', '+57 3013412327', NULL, '$2b$10$M1wpIvFZ.V3fbtKUbatFC.430dbAkNbLqohuTRZJ7CzcmEbQROqLS', '2024-01-19 02:21:28.328', NULL, NULL);
INSERT INTO public."User" VALUES (3, 'driver@trip.com', 'Driver Example', '+57 3013412321', NULL, '$2b$10$RdTL3aksn3jUnsdkL9IiUOVFThn/TtcRkpj1uhgX2H2A4BB2QUCRq', '2024-01-19 02:22:11.933', NULL, NULL);


--
-- TOC entry 4883 (class 0 OID 17279)
-- Dependencies: 231
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 218
-- Name: Cards_id_card_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cards_id_card_seq"', 1, true);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 228
-- Name: RolesByUser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RolesByUser_id_seq"', 3, true);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 226
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 1, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 220
-- Name: TripStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TripStatus_id_seq"', 5, true);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 222
-- Name: Trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Trip_id_seq"', 1, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 230
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- TOC entry 4701 (class 2606 OID 17179)
-- Name: Cards Cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cards"
    ADD CONSTRAINT "Cards_pkey" PRIMARY KEY (id_card);


--
-- TOC entry 4717 (class 2606 OID 17286)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 17256)
-- Name: RolesByUser RolesByUser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolesByUser"
    ADD CONSTRAINT "RolesByUser_pkey" PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 17249)
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 4707 (class 2606 OID 17232)
-- Name: Transaction Transaction_id_wompi_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_id_wompi_key" UNIQUE (id_wompi);


--
-- TOC entry 4709 (class 2606 OID 17230)
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 17234)
-- Name: Transaction Transaction_reference_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_reference_key" UNIQUE (reference);


--
-- TOC entry 4703 (class 2606 OID 17194)
-- Name: TripStatus TripStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TripStatus"
    ADD CONSTRAINT "TripStatus_pkey" PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 17205)
-- Name: Trip Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY (id);


--
-- TOC entry 4695 (class 2606 OID 17168)
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- TOC entry 4697 (class 2606 OID 17170)
-- Name: User User_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_phone_number_key" UNIQUE (phone_number);


--
-- TOC entry 4699 (class 2606 OID 17166)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 17180)
-- Name: Cards Cards_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cards"
    ADD CONSTRAINT "Cards_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id);


--
-- TOC entry 4723 (class 2606 OID 17262)
-- Name: RolesByUser RolesByUser_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolesByUser"
    ADD CONSTRAINT "RolesByUser_id_role_fkey" FOREIGN KEY (id_role) REFERENCES public."Roles"(id);


--
-- TOC entry 4724 (class 2606 OID 17257)
-- Name: RolesByUser RolesByUser_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolesByUser"
    ADD CONSTRAINT "RolesByUser_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id);


--
-- TOC entry 4722 (class 2606 OID 17235)
-- Name: Transaction Transaction_id_trip_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_id_trip_fkey" FOREIGN KEY (id_trip) REFERENCES public."Trip"(id);


--
-- TOC entry 4719 (class 2606 OID 17211)
-- Name: Trip Trip_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_id_driver_fkey" FOREIGN KEY (id_driver) REFERENCES public."User"(id);


--
-- TOC entry 4720 (class 2606 OID 17206)
-- Name: Trip Trip_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id);


--
-- TOC entry 4721 (class 2606 OID 17216)
-- Name: Trip Trip_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_status_fkey" FOREIGN KEY (status) REFERENCES public."TripStatus"(id);


-- Completed on 2024-01-19 02:26:18

--
-- PostgreSQL database dump complete
--

