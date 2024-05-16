import { capitalizeFirstLetter, getRubleRate, parseSrcSet } from "@/lib/utils";
import { GeneralSearchResultProductItem, SearchResultsHandler } from "@/types";
import { load } from "cheerio";
import fs from "fs";

export function generateProductUrlHandle({ objectID, Title }: any) {
  const merchantId = "loewe";
  const brand = "loewe";

  const shortDescription = Title.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}

export const getLoeweSearchResults = async ({
  page = "1",
}: {
  page?: string;
  searchValue?: string;
  category?: string;
}): Promise<SearchResultsHandler<GeneralSearchResultProductItem>> => {
  //
  const pageId = parseInt(page) - 1;

  const products: any[] = [];

  // q=women&prefn1=celShowInSearch&prefv1=true&start=40&sz=20
  const searchParams = new URLSearchParams({
    // q: "women",
    start: String(pageId * 20),
    sz: "20",
  });

  const ruble_rate = await getRubleRate();

  const response = await fetch(
    `https://www.loewe.com/eur/fr/search?${searchParams.toString()}`,
    {
      // verbose: true,
      headers: {
        cookie: `sid=jFe7xNQsUs563qWMRZ7vSxmdfKdy8Nkt_NA; usid_LOE_USA=a8341fa0-e0a7-4bd0-803e-1b24e048f86b; cc-nx-g_LOE_USA=VIlmgRgXJFfwAxqJw30ZRcq-AoMUJERD5SQrUneUCQg; dwanonymous_3a1a54738945adc064f9934bca77b3f5=abiZAExlaUkPYIo86wtapw1EnR; gtmPageLoad=eyJjbGllbnRTdGF0dXMiOiJOb3QgY2xpZW50IiwiZW1haWxIYXNoZWQiOiIiLCJsb2dpblN0YXR1cyI6Ik5vdCBsb2dnZWQiLCJ1c2VySWQiOiIifQ==; cc-sg_LOE_USA=1; __cq_dnt=1; dw_dnt=1; dwsid=DDGZyZ0pT9TTTgoMfVrEqZn7Xqo79cQ3VUCBFjyMf9qd_Cxh8reycBeEfmT7oyhhfuuCUOmd_UNKrYBD_7kddQ==; AKA_A2=A; plpGrid=4tile; _abck=03AAB3AF1D4122442549531FAAFC78FD~0~YAAQt2EXAvF5f0+PAQAAxS3ZcgsrxZvsOl9JoeP4yJzbwVopWiQM0IeIForr2LzbPkz4z/ablRvlH7ofXPXLunqun045h0jNJi9wx3yjNvDhzpP5ljC+FirP+n7bj/G32yZd3xmSRqID1/WrqRIJfU+i1KtI5v6+d+1c9nDJAKZV9plqC1Sr8gagIuRjc/kenB+d+JYARofxBFb6UMP2Kmc7LEApXdrqkTuvO8ttr32hL1P+7178LBGAKq7/VA4Ft00469b+3DPao9aL/hMIKDzkXJNNb/w0trSMFb+NDt6+tZq6T37oBMXK5R2qSqRkwYPC0WHrVz9wwjUq8Rm9P7l7D68IMo4C0TzTXCDLKBeTN4IlIGnHnhyxGsn+cO0yixm5H6FxEJvh4vgzfSM4hM6cA80fE+U=~-1~||-1||~-1; ak_bmsc=CF22075635716148509258802CECFE18~000000000000000000000000000000~YAAQt2EXAv95f0+PAQAAnS7ZchdhCWM1f1Ocy3yfCc+FBU2ITt4t1DHCNa52hblA1fZDBajGBzTqLVKi9qUiWv3iqK+UhHkJYdyNBHofU4oZ/OMvVlqHnBNQAjnuEGRwCoxeDyPR/BigIW6HPSTSDdA4x1oSRUl6edm/DaN4yApjIDtA+ARXSCRhxQfyhAQNtn4EjocEUHywbEFF2pl/Bj1z5HW0IsdFKr71G/0LKUXglR2Izhp1ymGShodlyWBAuKYJI7kqbrLgkEUwuZ61B8BXUws2kzjsiUXiZvChPdYA82swUPteE76yePkOYHal631kYLz6fz3mNntG8UqZfJ6enZAG3s3FjWUvJRCkutN8ypul+vPFBnZbRAGSB1hMUPrkcSyo1F5OfA9zaMfD1NUIat45IUaJ0vqiYc0OfphmOjFPogm84gQV0odv2AVM25Aa8WKDa90IuQ==; rskxRunCookie=0; rCookie=n5zdfcl4axfgecq8dif6ellw574ofi; OptanonAlertBoxClosed=2024-05-13T16:46:27.586Z; _dyid=7660623917060604898; _dyjsession=44678f46cd82eed80ba5e7f9d8c69621; _dy_csc_ses=t; dy_fs_page=www.loewe.com%2Fusa%2Fen%2Fhome%3Fcountry%3Dus%26gad_source%3D1%26gclid%3Dcjwkcajw9iaybhbjeiwavuc3fs94jbqoceywbauhnvhsnetodigqfzc_pskfuzsima2nbjwhthrruroc278qavd_bwe; _dy_df_geo=Slovakia..Bratislava; _dy_geo=SK.EU.SK_BL.SK_BL_Bratislava; _dycnst=dg; _cs_mk=0.6599244672441058_1715618787609; _gid=GA1.2.1842916136.1715618788; _gac_UA-2759242-15=1.1715618788.CjwKCAjw9IayBhBJEiwAVuc3fs94jBqoceyWbaUhnVHsnEtOdIgQFzc_pSKfuZsiMa2NBJwHTHRruRoC278QAvD_BwE; _cs_c=0; _gcl_au=1.1.1954440602.1715618788; _scid=499a0526-16ef-401c-8d91-c671a62854f2; _pin_unauth=dWlkPVltTTBaVGxsTlRrdFlXVTBNaTAwTm1Sa0xXRmhZbUV0TTJGak1UVTJNbVppTXpjMw; _tt_enable_cookie=1; _ttp=y_yTvg2RZEn3DAFj6CRNpvRVm94; FPID=FPID2.2.JMcyvqS2nhgfhqR67O1KGm9MZxI0hqpZMKa460w7C5o%3D.1715618788; FPLC=B49s6vCDLhl6HQL8pc1KzQoNxCNFdV6V4ftHDSXlgIQjI6lLmf2rYk10xL2bE9y%2BWrPmSXN932LV9Uk0U6MHcuzGuDL6JGuxqsGhOOlQnqjl75K4rIepM2aLTLXdxw%3D%3D; __qca=P0-1579675195-1715618788476; _clck=15y1pn3%7C2%7Cflq%7C0%7C1594; _dyid_server=7660623917060604898; _dy_c_exps=; _gcl_aw=GCL.1715618844.CjwKCAjw9IayBhBJEiwAVuc3fs94jBqoceyWbaUhnVHsnEtOdIgQFzc_pSKfuZsiMa2NBJwHTHRruRoC278QAvD_BwE; _dy_c_att_exps=; _uetsid=57f856e0114811efb666b30f141f382f; _uetvid=57f8c100114811efa8abaf0b861c0d55; _clsk=1pr7y7k%7C1715619148739%7C7%7C1%7Cr.clarity.ms%2Fcollect; dispatchSite=FR-fr-LOE_EUR-EUR; usid_LOE_EUR=c5b1c2ad-0e35-441c-bea1-6ef9d5991e36; dwanonymous_09ca7ed58839320229f1a601b6c9e62b=abK4H8uYiCeohwTcju2R1w2py1; cc-nx-g_LOE_EUR=kyqKOTg8Beo1h8_qCJtDky9g6TNEl4ddefNk2VC3GsU; cc-sg_LOE_EUR=1; bm_sz=57822F1B0CB2B4368042D6FDA64D4C30~YAAQ72EXAhwFe0+PAQAAxgHtchfYDeLjckryeEJFpnBWnkHo+NdVQSB1Q9ds6/y2r0VESTIa1xR+X22IgbCknv4jBXQ7NIPBOX/D06YAn+4zZR4GkNzGQ9yMFVrhBE2fhexixdNCcPCloWe8wwnP5wXP+0b5erVQF/meqf3Dye8d1x5YWuA20J5ppOuqbH0w7WfTxZDyp5NANhBx4EmPR/ncpx5R77TCKwGUl7tZ/Ob+Bvzkl2+AfyplbmRgJcLznUljrboHyWectnptGUx9FzMAnEh6nLVrMOJ6IEc4BoZIO566zQsTsINuHL4pw7R+I80IZ/VtYhS23DmUhkdFrlpxNENqr9eOh9gfq+aFFoJ8nXfzM43LFiY9q9PVnOOd2V1dzl98C/CPjOZ0DcdMjMsvynW9+B4l1dTk1h1RvOxFgj72eu7hFQSh2RPNm5vzaJM9VBjVNr77Afin/HJOAbqrTlOhqkx08GCIfu91tafFX07G/t/nkn8f~4539187~4534328; FPGSID=1.1715618788.1715620086.G-2ZCQ2DNS95.tpZhfvmL3ciRHcm4Pp0Msg; OptanonConsent=isGpcEnabled=0&datestamp=Mon+May+13+2024+19%3A08%3A07+GMT%2B0200+(Central+European+Summer+Time)&version=202401.2.0&browserGpcFlag=0&isIABGlobal=false&consentId=b793ffca-228b-46b0-ad2f-ef70844e50aa&interactionCount=1&landingPath=NotLandingPage&groups=C0003%3A1%2CC0005%3A1%2CC0004%3A1%2CC0002%3A1%2CC0001%3A1&hosts=H1247%3A1%2CH88%3A1%2CH529%3A1%2CH183%3A1%2CH1242%3A1%2CH1513%3A1%2CH174%3A1%2CH659%3A1%2CH1238%3A1%2CH100%3A1%2CH1302%3A1%2CH127%3A1%2CH363%3A1%2CH208%3A1%2CH89%3A1%2CH509%3A1%2CH521%3A1%2CH177%3A1%2CH34%3A1%2CH536%3A1%2CH180%3A1%2CH805%3A1%2CH95%3A1%2CH769%3A1%2CH537%3A1%2CH225%3A1%2CH528%3A1%2CH163%3A1%2CH164%3A1%2CH76%3A1%2CH531%3A1%2CH1571%3A1%2CH111%3A1%2CH102%3A1%2CH203%3A1%2CH1239%3A1%2CH526%3A1%2CH527%3A1%2CH514%3A1&genVendors=&geolocation=SK%3BBL&AwaitingReconsent=false; _cs_id=b53e0e2b-0d83-ad4d-88ae-eb2180fc1a26.1715618787.1.1715620087.1715618787.1.1749782787946.1; _cs_s=14.0.0.1715621887708; _dy_ses_load_seq=47382%3A1715620087802; _dy_cs_gcg=Dynamic%20Yield%20Experiences; _dy_cs_cookie_items=_dy_cs_gcg; _scid_r=499a0526-16ef-401c-8d91-c671a62854f2; _ga=GA1.1.964930121.1715618788; _derived_epik=dj0yJnU9VldMbXdmSnU1NjNZQ1c3bEpWdnRYcHhvYWVfYXY2eVYmbj1OM2szcUIzT0VaVFNOdzdNWVQxMzBBJm09MSZ0PUFBQUFBR1pDU1BrJnJtPTEmcnQ9QUFBQUFHWkNTUGsmc3A9Mg; _dy_lu_ses=44678f46cd82eed80ba5e7f9d8c69621%3A1715620089747; _dycst=dk.m.c.ss.fst.; _dy_toffset=-1; _dy_soct=1099816.1296418.1715620089*1163559.1459295.1715620087; inside-eu4=510677283-ef353f97585280181b443cfba80ddbc230ad653c3f1109c2605371bdacd3b826-0-0; lastRskxRun=1715620090605; _ga_2ZCQ2DNS95=GS1.1.1715618788.1.1.1715620094.0.0.935290144; bm_sv=D8EEEBEED22759536ECA6F18FE879024~YAAQtgRTaF3gyGiPAQAAgTntchdTiWAmDfwa0V2gbdJnvXGMbK78L0EnR+ORvJP+gw0UhS1PjZyv0bsgqKukdv6FWLtYRVcsUaLSiX8OJhaueWpgYP58cAhDic0s98nwNGlooDMGrbenpO5v0eR7S8/9dYBq5e5ivtNyQK9D6z/YpwBUyfafZQ/BuITjy+5VEA+4OzdaxdJMldb+nMmr8dpyAypJrGfENYARO4+ypuTySw9WOy0+84fhjD41SeDnMQ==~1`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Dnt: "1",
      },
    }
  );

  const html = await response.text();
  const $ = load(html);

  if (response.status !== 200) {
    console.log("response status is bad in getLoeweSearchResults");
    return {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      products: [],
      categories: [],
    };
  }

  fs.writeFileSync("body.html", html, "utf8");

  $(".capds-productsearchresult--4tile-grid").each((i, el) => {
    const product = $(el);
    const images: any[] = [];

    const unparsed_json = product.attr("data-product") as string;
    const json = JSON.parse(decodeURIComponent(unparsed_json));

    $(el)
      .find("img")
      .each((i, img_el) => {
        const image = $(img_el).attr("data-src");
        images.push({
          url: image,
          order: i + 1,
          size: "1000",
        });
      });

    products.push({
      id: json.colorId,
      objectID: json.colorId,
      backend: "salesforce",
      title: json.name,
      currency: "RUB",
      gender: [capitalizeFirstLetter(json.category.split(" / ")[0])],
      category: [json.category.split(" / ")],
      brand: {
        id: "loewe",
        name: "Loewe",
        description: "Loewe",
      },
      images: [images[0]],
      slug: generateProductUrlHandle({ objectID: json.id, Title: json.name }),
      price: json.price * 1.2 * ruble_rate,
    });
  });

  const totalItems = parseInt(
    $(".capds-productsearchresul__results").text().replace(".", "")
  );

  return {
    totalItems: totalItems,
    totalPages: totalItems / 20,
    currentPage: pageId,
    products: products,
    categories: [],
  };
};
