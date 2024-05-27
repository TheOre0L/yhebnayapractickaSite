PGDMP      #    
            |            yuvelir    16rc1    16rc1 ;    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25703    yuvelir    DATABASE     {   CREATE DATABASE yuvelir WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE yuvelir;
                postgres    false            �            1255    25772    audit_delete_function()    FUNCTION       CREATE FUNCTION public.audit_delete_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO AuditTrail (TableName, Action, ActionBy, ActionDate)
    VALUES ('ORDER', 'DELETE', current_user, current_timestamp);
    RETURN OLD;
END;
$$;
 .   DROP FUNCTION public.audit_delete_function();
       public          postgres    false            �            1255    25768    audit_insert_function()    FUNCTION       CREATE FUNCTION public.audit_insert_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO AuditTrail (TableName, Action, ActionBy, ActionDate)
    VALUES ('ORDER', 'INSERT', current_user, current_timestamp);
    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.audit_insert_function();
       public          postgres    false            �            1255    25770    audit_update_function()    FUNCTION       CREATE FUNCTION public.audit_update_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO AuditTrail (TableName, Action, ActionBy, ActionDate)
    VALUES ('ORDER', 'UPDATE', current_user, current_timestamp);
    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.audit_update_function();
       public          postgres    false            �            1255    25779    reportclientorders(integer)    FUNCTION     [  CREATE FUNCTION public.reportclientorders(client_id integer) RETURNS TABLE(orderid integer, clientid integer, jewelryid integer, summa numeric, orderdate date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY 
    SELECT c.OrderID, c.ClientID, c.JewelryID, c.Summa, c.OrderDate
    FROM OrderInfo c
    WHERE c.ClientID = client_id;
END;
$$;
 <   DROP FUNCTION public.reportclientorders(client_id integer);
       public          postgres    false            �            1255    25778    reportclients()    FUNCTION     �   CREATE FUNCTION public.reportclients() RETURNS TABLE(clientid integer, name character varying, contactinfo character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY 
    SELECT c.clientid, c.name, c.contactinfo
    FROM Client c;
END;
$$;
 &   DROP FUNCTION public.reportclients();
       public          postgres    false            �            1255    25780 !   reportprofitforperiod(date, date)    FUNCTION     J  CREATE FUNCTION public.reportprofitforperiod(start_date date, end_date date) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
    total_profit DECIMAL := 0;
BEGIN
    SELECT SUM(c.Summa)
    INTO total_profit
    FROM OrderInfo c
    WHERE c.OrderDate BETWEEN start_date AND end_date;
    
    RETURN total_profit;
END;
$$;
 L   DROP FUNCTION public.reportprofitforperiod(start_date date, end_date date);
       public          postgres    false            �            1259    25760 
   audittrail    TABLE     �   CREATE TABLE public.audittrail (
    auditid integer NOT NULL,
    tablename character varying(255),
    action character varying(255),
    actionby character varying(255),
    actiondate timestamp without time zone
);
    DROP TABLE public.audittrail;
       public         heap    postgres    false            �            1259    25759    audittrail_auditid_seq    SEQUENCE     �   CREATE SEQUENCE public.audittrail_auditid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.audittrail_auditid_seq;
       public          postgres    false    226            �           0    0    audittrail_auditid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.audittrail_auditid_seq OWNED BY public.audittrail.auditid;
          public          postgres    false    225            �            1259    25705    client    TABLE     �   CREATE TABLE public.client (
    clientid integer NOT NULL,
    name character varying(50),
    contactinfo character varying(100)
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    25704    client_clientid_seq    SEQUENCE     �   CREATE SEQUENCE public.client_clientid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.client_clientid_seq;
       public          postgres    false    216            �           0    0    client_clientid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.client_clientid_seq OWNED BY public.client.clientid;
          public          postgres    false    215            �            1259    25719    gemstone    TABLE     �   CREATE TABLE public.gemstone (
    gemstoneid integer NOT NULL,
    gemstonetype character varying(50),
    gemstoneprice numeric(10,2)
);
    DROP TABLE public.gemstone;
       public         heap    postgres    false            �            1259    25718    gemstone_gemstoneid_seq    SEQUENCE     �   CREATE SEQUENCE public.gemstone_gemstoneid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.gemstone_gemstoneid_seq;
       public          postgres    false    220            �           0    0    gemstone_gemstoneid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.gemstone_gemstoneid_seq OWNED BY public.gemstone.gemstoneid;
          public          postgres    false    219            �            1259    25726    jewelry    TABLE     �   CREATE TABLE public.jewelry (
    jewelryid integer NOT NULL,
    type character varying(50),
    weight numeric(8,2),
    materialid integer,
    gemstoneid integer
);
    DROP TABLE public.jewelry;
       public         heap    postgres    false            �            1259    25725    jewelry_jewelryid_seq    SEQUENCE     �   CREATE SEQUENCE public.jewelry_jewelryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.jewelry_jewelryid_seq;
       public          postgres    false    222            �           0    0    jewelry_jewelryid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.jewelry_jewelryid_seq OWNED BY public.jewelry.jewelryid;
          public          postgres    false    221            �            1259    25712    material    TABLE     �   CREATE TABLE public.material (
    materialid integer NOT NULL,
    materialtype character varying(50),
    price numeric(10,2)
);
    DROP TABLE public.material;
       public         heap    postgres    false            �            1259    25711    material_materialid_seq    SEQUENCE     �   CREATE SEQUENCE public.material_materialid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.material_materialid_seq;
       public          postgres    false    218            �           0    0    material_materialid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.material_materialid_seq OWNED BY public.material.materialid;
          public          postgres    false    217            �            1259    25743 	   orderinfo    TABLE     �   CREATE TABLE public.orderinfo (
    orderid integer NOT NULL,
    clientid integer,
    jewelryid integer,
    orderdate date DEFAULT now(),
    summa numeric(10,2),
    comment character varying(2000)
);
    DROP TABLE public.orderinfo;
       public         heap    postgres    false            �            1259    25742    orderinfo_orderid_seq    SEQUENCE     �   CREATE SEQUENCE public.orderinfo_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.orderinfo_orderid_seq;
       public          postgres    false    224            �           0    0    orderinfo_orderid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.orderinfo_orderid_seq OWNED BY public.orderinfo.orderid;
          public          postgres    false    223            ?           2604    25763    audittrail auditid    DEFAULT     x   ALTER TABLE ONLY public.audittrail ALTER COLUMN auditid SET DEFAULT nextval('public.audittrail_auditid_seq'::regclass);
 A   ALTER TABLE public.audittrail ALTER COLUMN auditid DROP DEFAULT;
       public          postgres    false    225    226    226            9           2604    25708    client clientid    DEFAULT     r   ALTER TABLE ONLY public.client ALTER COLUMN clientid SET DEFAULT nextval('public.client_clientid_seq'::regclass);
 >   ALTER TABLE public.client ALTER COLUMN clientid DROP DEFAULT;
       public          postgres    false    216    215    216            ;           2604    25722    gemstone gemstoneid    DEFAULT     z   ALTER TABLE ONLY public.gemstone ALTER COLUMN gemstoneid SET DEFAULT nextval('public.gemstone_gemstoneid_seq'::regclass);
 B   ALTER TABLE public.gemstone ALTER COLUMN gemstoneid DROP DEFAULT;
       public          postgres    false    219    220    220            <           2604    25729    jewelry jewelryid    DEFAULT     v   ALTER TABLE ONLY public.jewelry ALTER COLUMN jewelryid SET DEFAULT nextval('public.jewelry_jewelryid_seq'::regclass);
 @   ALTER TABLE public.jewelry ALTER COLUMN jewelryid DROP DEFAULT;
       public          postgres    false    222    221    222            :           2604    25715    material materialid    DEFAULT     z   ALTER TABLE ONLY public.material ALTER COLUMN materialid SET DEFAULT nextval('public.material_materialid_seq'::regclass);
 B   ALTER TABLE public.material ALTER COLUMN materialid DROP DEFAULT;
       public          postgres    false    218    217    218            =           2604    25746    orderinfo orderid    DEFAULT     v   ALTER TABLE ONLY public.orderinfo ALTER COLUMN orderid SET DEFAULT nextval('public.orderinfo_orderid_seq'::regclass);
 @   ALTER TABLE public.orderinfo ALTER COLUMN orderid DROP DEFAULT;
       public          postgres    false    224    223    224            �          0    25760 
   audittrail 
   TABLE DATA           V   COPY public.audittrail (auditid, tablename, action, actionby, actiondate) FROM stdin;
    public          postgres    false    226   �G       �          0    25705    client 
   TABLE DATA           =   COPY public.client (clientid, name, contactinfo) FROM stdin;
    public          postgres    false    216   �H       �          0    25719    gemstone 
   TABLE DATA           K   COPY public.gemstone (gemstoneid, gemstonetype, gemstoneprice) FROM stdin;
    public          postgres    false    220   J       �          0    25726    jewelry 
   TABLE DATA           R   COPY public.jewelry (jewelryid, type, weight, materialid, gemstoneid) FROM stdin;
    public          postgres    false    222   QJ       �          0    25712    material 
   TABLE DATA           C   COPY public.material (materialid, materialtype, price) FROM stdin;
    public          postgres    false    218   �J       �          0    25743 	   orderinfo 
   TABLE DATA           \   COPY public.orderinfo (orderid, clientid, jewelryid, orderdate, summa, comment) FROM stdin;
    public          postgres    false    224   �J       �           0    0    audittrail_auditid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.audittrail_auditid_seq', 64, true);
          public          postgres    false    225            �           0    0    client_clientid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.client_clientid_seq', 19, true);
          public          postgres    false    215            �           0    0    gemstone_gemstoneid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.gemstone_gemstoneid_seq', 2, true);
          public          postgres    false    219            �           0    0    jewelry_jewelryid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.jewelry_jewelryid_seq', 1, true);
          public          postgres    false    221            �           0    0    material_materialid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.material_materialid_seq', 3, true);
          public          postgres    false    217            �           0    0    orderinfo_orderid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.orderinfo_orderid_seq', 24, true);
          public          postgres    false    223            K           2606    25767    audittrail audittrail_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.audittrail
    ADD CONSTRAINT audittrail_pkey PRIMARY KEY (auditid);
 D   ALTER TABLE ONLY public.audittrail DROP CONSTRAINT audittrail_pkey;
       public            postgres    false    226            A           2606    25710    client client_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (clientid);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    216            E           2606    25724    gemstone gemstone_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.gemstone
    ADD CONSTRAINT gemstone_pkey PRIMARY KEY (gemstoneid);
 @   ALTER TABLE ONLY public.gemstone DROP CONSTRAINT gemstone_pkey;
       public            postgres    false    220            G           2606    25731    jewelry jewelry_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.jewelry
    ADD CONSTRAINT jewelry_pkey PRIMARY KEY (jewelryid);
 >   ALTER TABLE ONLY public.jewelry DROP CONSTRAINT jewelry_pkey;
       public            postgres    false    222            C           2606    25717    material material_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (materialid);
 @   ALTER TABLE ONLY public.material DROP CONSTRAINT material_pkey;
       public            postgres    false    218            I           2606    25748    orderinfo orderinfo_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.orderinfo
    ADD CONSTRAINT orderinfo_pkey PRIMARY KEY (orderid);
 B   ALTER TABLE ONLY public.orderinfo DROP CONSTRAINT orderinfo_pkey;
       public            postgres    false    224            P           2620    25773    orderinfo audit_delete    TRIGGER     {   CREATE TRIGGER audit_delete AFTER DELETE ON public.orderinfo FOR EACH ROW EXECUTE FUNCTION public.audit_delete_function();
 /   DROP TRIGGER audit_delete ON public.orderinfo;
       public          postgres    false    229    224            Q           2620    25769    orderinfo audit_insert    TRIGGER     {   CREATE TRIGGER audit_insert AFTER INSERT ON public.orderinfo FOR EACH ROW EXECUTE FUNCTION public.audit_insert_function();
 /   DROP TRIGGER audit_insert ON public.orderinfo;
       public          postgres    false    227    224            R           2620    25771    orderinfo audit_update    TRIGGER     {   CREATE TRIGGER audit_update AFTER UPDATE ON public.orderinfo FOR EACH ROW EXECUTE FUNCTION public.audit_update_function();
 /   DROP TRIGGER audit_update ON public.orderinfo;
       public          postgres    false    224    228            L           2606    25737    jewelry jewelry_gemstoneid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.jewelry
    ADD CONSTRAINT jewelry_gemstoneid_fkey FOREIGN KEY (gemstoneid) REFERENCES public.gemstone(gemstoneid);
 I   ALTER TABLE ONLY public.jewelry DROP CONSTRAINT jewelry_gemstoneid_fkey;
       public          postgres    false    4677    222    220            M           2606    25732    jewelry jewelry_materialid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.jewelry
    ADD CONSTRAINT jewelry_materialid_fkey FOREIGN KEY (materialid) REFERENCES public.material(materialid);
 I   ALTER TABLE ONLY public.jewelry DROP CONSTRAINT jewelry_materialid_fkey;
       public          postgres    false    222    218    4675            N           2606    25749 !   orderinfo orderinfo_clientid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderinfo
    ADD CONSTRAINT orderinfo_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.client(clientid);
 K   ALTER TABLE ONLY public.orderinfo DROP CONSTRAINT orderinfo_clientid_fkey;
       public          postgres    false    4673    216    224            O           2606    25754 "   orderinfo orderinfo_jewelryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderinfo
    ADD CONSTRAINT orderinfo_jewelryid_fkey FOREIGN KEY (jewelryid) REFERENCES public.jewelry(jewelryid);
 L   ALTER TABLE ONLY public.orderinfo DROP CONSTRAINT orderinfo_jewelryid_fkey;
       public          postgres    false    224    4679    222            �     x���MJ1��u�s�	��K'��B�v�nť����������ǋiy�Nm[���v^��.�׏�˂�|9b: T�J��5 :9;�8�:Lv��a���a~pj����P*He���`7�0�0�0�0�0�aV�)������$��� �J�ifڃ���``�=�ifڃ���``�=�odڃ�������Sٿ#���փ��z�[zc�Aol=荭����3j�Ao=H�~1�E0K
j��C+SPC~�F�U�Cv��
Ģ� �9�>��#      �     x�e�MJ�@�וS��H&w�M�-��2��JFэ��<@F3�3�������tQ_�{�<�=��a���H�rO��$��� K�����SC�r2����X�2Ex���6a��O���il[�޳D�[�T.�Ѫ+���"	��MlΌ6���v���X8[��3v��Iz�ŭ���5���x��Ia{c�O��摖��^뎋ڨ�a��B�z;:�����-��@@x��:H-�J;S�t$M���� Թ�^0s��������Q�á��?g�8�y&      �   =   x�3估��֋��.컰�b���
v]�paυ��^����2"����@���+F��� �,      �   "   x�3估��֋��8�8�9�b���� �l�      �   =   x�3⼰��֋��.컰�b���
�\� �n��paǅvs�p�4F��� ܘ2v      �   9   x�mɱ� ������\���?G(RR�+�%�_�J8�غX��ң�q�?�=m���     