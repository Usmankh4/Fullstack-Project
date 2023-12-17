"use client";

import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { buildCollection, buildProperty, EntityReference, } from "firecms";
import { Authenticator,FirebaseCMSApp } from "firecms";
import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import 'firebase/storage';


// TODO: Replace with your config
import { firebaseConfig } from "@/firebase";

const locales = {
    "en-US": "English (United States)",
    "es-ES": "Spanish (Spain)",
    "de-DE": "German"
};

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number; // For products without sizes
  sizes?: { [size: string]: number }; // For products with sizes
  tags: string[];
};

const ProductsCollection = buildCollection<Product>({
    name: "Products",
    singularName: "Product",
    path: "Products",
    group: "Products page",
    properties: {
      name: buildProperty({
        dataType: "string",
        name: "Name",
        description: "The name of the product.",
        validation: { required: true },
      }),
      price: buildProperty({
        dataType: "number",
        name: "Price",
        description: "The price of the product in your preferred currency.",
        validation: { required: true, min: 0 },
      }),
      description: buildProperty({
        dataType: "string",
        name: "Description",
        description: "A detailed description of the product.",
        validation: { required: true },
      }),
      image: buildProperty({
        dataType: "string",
        title: "Image",
        description: "Upload an image for the product.",
        storage: {
          storagePath: "images/products",
          acceptedFiles: ["image/png", "image/jpg", "image/jpeg"],
          maxSize: 1920 * 1080,
          metadata: {
            cacheControl: "max-age=1000000",
          },
        },
      }),
      tags: buildProperty({
        dataType: "array",
        name: "Tags",
        description:
          "Tags for categorizing the product. Can include multiple tags.",
        of: {
          dataType: "string",
        },
      }),
  
      hasSizes: buildProperty({
        dataType: "boolean",
        name: "Has Sizes",
        description: "Does this product come in different sizes?",
      }),
  
      quantity: buildProperty(({ values }) => ({
        dataType: "number",
        name: "Quantity",
        description: "Total quantity available for this product.",
        disabled: values.hasSizes && {
          clearOnDisabled: true,
          disabledMessage: "Quantity is not applicable for products with sizes.",
        },
        validation: { required: !values.hasSizes, min: 0 },
      })),
  
      sizes: buildProperty(({ values }) => ({
        dataType: "map",
        name: "Sizes",
        description: "Quantities for each size.",
        properties: {
          S: {
            dataType: "number",
            name: "Small",
            validation: { required: false, min: 0 },
          },
          M: {
            dataType: "number",
            name: "Medium",
            validation: { required: false, min: 0 },
          },
          L: {
            dataType: "number",
            name: "Large",
            validation: { required: false, min: 0 },
          },
        },
        disabled: !values.hasSizes && {
          clearOnDisabled: true,
          disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
          hidden: true,
        },
  
        validation: values.hasSizes ? { required: true } : undefined,
      })),
    },
  });

export default function CMS() {

    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
                                                                                user,
                                                                                authController
                                                                            }) => {

        if (user?.email?.includes("flanders")) {
            throw Error("Stupid Flanders!");
        }

        console.log("Allowing access to", user?.email);

        return true;
    }, []);

    return <FirebaseCMSApp
        name={"My Online Shop"}
        basePath={"/cms"}
        authentication={myAuthenticator}
        collections={[ProductsCollection]}
        firebaseConfig={firebaseConfig}
    />;
}