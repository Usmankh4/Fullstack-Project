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
  category: 'Phone' | 'Accessory';
  description: string;
  hasWarranty: boolean;
  mainImage: string;
  optionalImages: string[];
  quantity: number; // For products without sizes
  hasStorage?: boolean;
  colours?: string [];
  tags: string[];
};
// 
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


      mainImage: buildProperty({
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
        validation: { required: true },
      }),
      optionalImages:buildProperty({
        dataType: "array",
        name: "Images",
        of: {
            dataType: "string",
            storage: {
              storagePath: "images/products",
              acceptedFiles: ["image/png", "image/jpg", "image/jpeg"],
              maxSize: 1920 * 1080,
              metadata: {
                cacheControl: "max-age=1000000",
              },
            },
        },
        description: "This fields allows uploading multiple images at once"
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

      

      colours: buildProperty({
        dataType: "string",
        name: "Colours",
        description: "Available colours for phones",
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
  
     
      category:{
        dataType:"string",
        name:"Category",
      },
      hasStorage: buildProperty({
        dataType: "boolean",
        name: "Storage Options ",
        description: "Storage options for phones ",
      }),
      hasWarranty:{
        dataType:"boolean",
        name:"Has Warrenty"
      }

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