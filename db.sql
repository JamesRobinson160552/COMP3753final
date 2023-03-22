--Create full database via SQL--


-- Database: COMP3753_DB_ZJBR------------------------------------------------------------------------------------------
-- DROP DATABASE IF EXISTS "COMP3753_DB_ZJBR";
CREATE DATABASE "COMP3753_DB_ZJBR"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- SCHEMA: public------------------------------------------------------------------------------------------------------
-- DROP SCHEMA IF EXISTS public ;
CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION postgres;
COMMENT ON SCHEMA public
    IS 'standard public schema';
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;


-- Table: public.Art ----------------------------------------------------------------------------------------------------
--DROP TABLE IF EXISTS public."Art";
CREATE TABLE IF NOT EXISTS public."Art"
(
    "ArtID" integer NOT NULL,
    "Title" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying(200) COLLATE pg_catalog."default",
    "Date" date NOT NULL,
    "UserID" integer NOT NULL,
    "ArtistID" integer --Artist can be anonymous (null)
    "MediumID" integer NOT NULL,
    "LocationID" integer NOT NULL,
    CONSTRAINT "Art_pkey" PRIMARY KEY ("ArtID"),
    CONSTRAINT fk_mediumid FOREIGN KEY ("MediumID")
        REFERENCES public."Medium" ("MediumID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT fk_userid FOREIGN KEY ("UserID")
        REFERENCES public."User" ("UserID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_artistid FOREIGN KEY ("ArtistID")
        REFERENCES public."Artist" ("UserID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_locationid FOREIGN KEY ("LocationID")
        REFERENCES public."Location" ("LocationID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Art"
    OWNER to postgres;
COMMENT ON CONSTRAINT fk_mediumid ON public."Art"
    IS 'Each art piece has a foreign key referencing its medium.';
COMMENT ON CONSTRAINT fk_userid ON public."Art"
    IS 'Represents the current owner of the art piece';
COMMENT ON CONSTRAINT fk_locationid ON public."Art"
    IS 'Represents the location of the art piece (for shipping, searches, etc)';
COMMENT ON CONSTRAINT fk_artistid ON public."Art"
    IS 'Represents the creator of the art piece if known/identified';

-- Table: public.Medium-----------------------------------------------------------------------------------------------
--DROP TABLE IF EXISTS public."Medium";
CREATE TABLE IF NOT EXISTS public."Medium"
(
    "MediumID" integer NOT NULL,
    "Size" integer[] NOT NULL,
    "Material" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Medium_pkey" PRIMARY KEY ("MediumID")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Medium"
    OWNER to postgres;

-- Table: public.User-------------------------------------------------------------------------------------------------
--DROP TABLE IF EXISTS public."User";
CREATE TABLE IF NOT EXISTS public."User"
(
    "UserID" integer NOT NULL,
    "Password" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;


-- Table: public.Location--------------------------------------------------------------------------------------------
--DROP TABLE IF EXISTS public."Location";
CREATE TABLE IF NOT EXISTS public."Location"
(
    "LocationID" integer NOT NULL,
    "City" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Postal" character varying(7) COLLATE pg_catalog."default" NOT NULL,
    "Street" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Location_pkey" PRIMARY KEY ("LocationID")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Location"
    OWNER to postgres;

-- Table: public.Artist------------------------------------------------------------------------------------------------
--DROP TABLE IF EXISTS public."Artist";
CREATE TABLE IF NOT EXISTS public."Artist"
(
    -- Inherited from table public."User": "UserID" integer NOT NULL,
    -- Inherited from table public."User": "Password" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public."User": "Email" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public."User": "Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Quantity Sold" integer NOT NULL DEFAULT 0,
    "LocationID" integer NOT NULL,
    CONSTRAINT "Artist_pkey" PRIMARY KEY ("UserID"),
    CONSTRAINT fk_locationid FOREIGN KEY ("LocationID")
        REFERENCES public."Location" ("LocationID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL

)
    INHERITS (public."User")
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."Artist"
    OWNER to postgres;

