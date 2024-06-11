import { index } from "@/lib/algolia";
import { fsync, writeFileSync } from "fs";
import { sleep } from "./lib/utils";

// remove all products from index with faucet "brand.name": "Loro Piana"
// remove all products from index with faucet "brand.name": "Loro Piana"
// remove all products from index with faucet "brand.name": "Loro Piana"

// (async () => {
//   const results = await index.search("", {
//     analytics: false,
//     attributesToRetrieve: ["*"],
//     attributesToSnippet: ["*:20"],
//     enableABTest: false,
//     explain: ["*"],
//     facetFilters: [
//       [
//         "gender:Baby",
//         "gender:Baby Dior",
//         "gender:Bags",
//         "gender:Beachwear",
//         "gender:FENDI x FRGMT x POKÉMON",
//         "gender:Gift Ideas",
//         "gender:Gifts",
//         "gender:Loewe-baskets",
//         "gender:Personalised-charms",
//         "gender:Unisex",
//       ],
//     ],
//     facets: ["*"],
//     getRankingInfo: true,
//     hitsPerPage: 100,
//     maxValuesPerFacet: 100,
//     page: 0,
//     responseFields: ["*"],
//     snippetEllipsisText: "…",
//   }); // Process allProducts here (e.g., save to database, display, etc.)

//   await index
//     .deleteObjects(results.hits.map((x) => x.objectID))
//     .then(console.log);
// })();

// (async () => {
//   const { getGucciSearchResults } = await import("./scrapers/gucci");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getGucciSearchResults({
//       page: "1",
//       searchValue: "",
//       category: "",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getGucciSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       //   console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Gucci search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(allProducts); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Gucci search results:", error);
//   }
// })();

// (async () => {
//   const { getDiorSearchResults } = await import("./scrapers/dior/methods");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getDiorSearchResults({
//       page: "1",
//       searchValue: "",
//       category: "",
//     });

//     allProducts.push(...products); // Add initial page products

// while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getDiorSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       //   console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Dior search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(allProducts); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Dior search results:", error);
//   }
// })();

// (async () => {
//   const { getLoroPianaSearchResults } = await import(
//     "./scrapers/loro-piana/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getLoroPianaSearchResults(
//       {
//         page: "1",
//         searchValue: "",
//         category: "",
//       }
//     );

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getLoroPianaSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       //   console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Loro Piana search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Loro Piana search results:", error);
//   }
// })();

// (async () => {
//   const { getPradaSearchResults } = await import("./scrapers/prada/methods");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getPradaSearchResults({
//       page: "1",
//       searchValue: "",
//       category: "",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getPradaSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Prada search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Prada search results:", error);
//   }
// })();

// (async () => {
//   const { getMiuMiuSearchResults } = await import("./scrapers/miumiu/methods");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getMiuMiuSearchResults({
//       page: "1",
//       searchValue: "",
//       category: "",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getMiuMiuSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Prada search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Prada search results:", error);
//   }
// })();

// (async () => {
//   const { getArmaniSearchResults } = await import("./scrapers/armani/methods");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getArmaniSearchResults({
//       page: "1",
//       searchValue: "",
//       category: "",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getArmaniSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       //   console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All armani search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching armani search results:", error);
//   }
// })();

// (async () => {
//   const { getDolceGabbanaSearchResults } = await import(
//     "./scrapers/dolce-gabbana/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } =
//       await getDolceGabbanaSearchResults({
//         page: "1",
//         searchValue: "",
//         category: "",
//       });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getDolceGabbanaSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Dolce Gabbana search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Dolce Gabbana search results:", error);
//   }
// })();

// (async () => {
//   const { getLouisVuittonSearchResults } = await import(
//     "./scrapers/louis-vuitton/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } =
//       await getLouisVuittonSearchResults({
//         page: "1",
//         searchValue: "",
//         category: "",
//       });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getLouisVuittonSearchResults({
//         page: String(currentPage),
//         searchValue: "",
//         category: "",
//       });

//       //   console.log(result);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Louis Vuitton search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Louis Vuitton search results:", error);
//   }
// })();

// (async () => {
//   const { getFendiSearchResults } = await import(
//     "./scrapers/fendi-algolia-sdk/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getFendiSearchResults({
//       page: "1",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getFendiSearchResults({
//         page: String(currentPage),
//       });

//       //   console.log(result.products);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Fendi search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Fendi search results:", error);
//   }
// })();

// (async () => {
//   const { getCelineSearchResults } = await import(
//     "./scrapers/celine-demandware/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getCelineSearchResults({
//       page: "1",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getCelineSearchResults({
//         page: String(currentPage),
//       });

//       //   console.log(result.products[0].images);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products); // Add products from each page
//     }

//     console.log("All Celine search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     ); // Save all products to Algolia
//     console.log(response);

//     // console.log(allProducts);
//     console.log("Algolia indexing complete!");

//     // Process allProducts here (e.g., save to database, display, etc.)
//   } catch (error) {
//     console.error("Error fetching Celine search results:", error);
//   }
// })();

// (async () => {
//   const { getLoeweSearchResults } = await import(
//     "./scrapers/loewe-demandware/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getLoeweSearchResults({
//       page: "1",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getLoeweSearchResults({
//         page: String(currentPage),
//       });

//       //   console.log(result.products[0].images);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products);
//     }

//     console.log("All Loewe search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const result = allProducts.filter((x) => typeof x !== "undefined");

//     // save to file & upload to Algolia
//     writeFileSync("results.json", JSON.stringify(result), "utf8");
//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined"),
//     );
//     console.log(response);

//     console.log("Algolia indexing complete!");
//   } catch (error) {
//     console.error("Error fetching Loewe search results:", error);
//   }
// })();

// (async () => {
//   const { getAlaiaSearchResults } = await import("./scrapers/alaia/methods");

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getAlaiaSearchResults({
//       page: "1",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getAlaiaSearchResults({
//         page: String(currentPage),
//       });

//       //   console.log(result.products[0].images);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products);
//     }

//     console.log("All Alaia search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const result = allProducts.filter((x) => typeof x !== "undefined");

//     // save to file & upload to Algolia
//     writeFileSync("results.json", JSON.stringify(result), "utf8");
//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     );
//     console.log(response);

//     console.log("Algolia indexing complete!");
//   } catch (error) {
//     console.error("Error fetching Alaia search results:", error);
//   }
// })();

// (async () => {
//   const { getBottegaSearchResults } = await import(
//     "./scrapers/bottega-demandware/methods"
//   );

//   let allProducts = []; // Array to store all scraped products

//   try {
//     let { totalPages, currentPage, products } = await getBottegaSearchResults({
//       page: "1",
//     });

//     allProducts.push(...products); // Add initial page products

//     while (currentPage < totalPages) {
//       currentPage++; // Increment page before fetching

//       const result = await getBottegaSearchResults({
//         page: String(currentPage),
//       });

//       //   console.log(result.products[0].images);
//       console.log(`Fetched page ${currentPage} of ${totalPages}`);
//       allProducts.push(...result.products);
//     }

//     console.log("All Bottega Veneta search results scraped successfully!");
//     console.log("Total products:", allProducts.length);

//     const result = allProducts.filter((x) => typeof x !== "undefined");

//     // save to file & upload to Algolia
//     writeFileSync("results.json", JSON.stringify(result), "utf8");
//     const response = await index.saveObjects(
//       allProducts.filter((x) => typeof x !== "undefined")
//     );

//     console.warn(`${response.objectIDs.length} objects saved to Algolia`);
//     console.warn("Algolia indexing complete!");
//   } catch (error) {
//     console.error("Error fetching Bottega Veneta search results:", error);
//   }
// })();

(async () => {
  const { gender } = await import("./scrapers/mytheresa");
  const { getAllBrands, getAllProducts } = await import(
    "./scrapers/mytheresa/index"
  );

  const brands = await getAllBrands();

  console.log(
    `Total of ${brands.length} brands was loaded for "${gender}" gender.`
  );

  for (let i = 0; i < brands.length; i++) {
    // await sleep(i * 3000);
    let allProducts = []; // Array to store all scraped products

    try {
      let { totalPages, currentPage, totalItems, products } =
        await getAllProducts(1, brands[i].slug);

      console.log(
        `Fetching ${totalItems} products for brand ${brands[i].name} (${
          i + 1
        }/${brands.length})`
      );

      allProducts.push(...products); // Add initial page products

      while (currentPage < totalPages) {
        currentPage++; // Increment page before fetching

        const result = await getAllProducts(1, brands[i].slug);

        //   console.log(result.products[0].images);
        console.log(`Fetched page ${currentPage} of ${totalPages}`);
        allProducts.push(...result.products);
      }

      console.log(`All ${brands[i].name} search results scraped successfully!`);
      console.log("Total products:", allProducts.length);

      const result = allProducts.filter((x) => typeof x !== "undefined");

      // save to file & upload to Algolia
      writeFileSync("results.json", JSON.stringify(result), "utf8");
      const response = await index.partialUpdateObjects(
        allProducts.filter((x) => typeof x !== "undefined"),
        { createIfNotExists: true }
      );

      console.warn(`${response.objectIDs.length} objects saved to Algolia`);
      console.warn("Algolia indexing complete!");
    } catch (error) {
      console.error(
        `Error fetching ${brands[i].name}. Internet connection has likely been interrupted:`,
        error
      );
    }
  }

  // for loop to iterate through brands and asynchronously fetch products, and push to allProducts array
})();
