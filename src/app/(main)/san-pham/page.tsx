"use client";
import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getProductList } from "@/api/product";
import PaginationCustom from "@/components/pagination";
import { FilterProduct, ProductCard } from "@/components/product-category";
import { QueryKey } from "@/constant/query-key";
import { ATOM_KEY } from "@/store/key";
import {
  FILTER_PRODUCT_DEFAULT,
  filterProductState,
} from "@/store/state/product-filter.atom";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

export default function ProductPage() {
  const [productParam, setProductParam] = useRecoilState(filterProductState);
  const searchParams = useSearchParams();
  const isRedirectToProduct = useRef(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const filterProduct = sessionStorage.getItem(ATOM_KEY.FILTER_PRODUCT);
    if (filterProduct) {
      setProductParam(JSON.parse(filterProduct));
    }
    const keyword = searchParams.get("search");
    if (keyword) {
      setProductParam((prev) => ({
        ...prev,
        keyword,
      }));
    }

    return () => {
      if (isRedirectToProduct.current) {
        return;
      }
      setProductParam(FILTER_PRODUCT_DEFAULT);
      sessionStorage.removeItem(ATOM_KEY.FILTER_PRODUCT);
    };
  }, []);

  // useEffect(() => {
  //   if (pageRef.current) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [pageRef]);

  const { data: productListData, isFetched } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_LIST, productParam],
    queryFn: () => getProductList(productParam),
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const router = useRouter();

  const handleChangePage = useCallback(
    (page: number) => {
      setProductParam((prev) => ({
        ...prev,
        page: page,
      }));

      scrollToTop();
      router.push(`/san-pham?&page=${page}`);
    },
    [router, setProductParam]
  );

  useEffect(() => {
    router.push(`/san-pham?&page=${productParam.page}`);
  }, []);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setProductParam((prev) => ({
        ...prev,
        page: Number(page),
      }));
    }
  }, [searchParams, setProductParam]);

  useEffect(() => {
    setTimeout(() => scrollToTop(), 0);
  }, []);

  return (
    <div className="flex relative">
      <FilterProduct />
      <div className="flex-1 p-4">
        {productListData && (
          <>
            <span ref={pageRef}></span>
            <div className="max-w-[1300px] mx-auto">
              <SimpleGrid
                cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }}
                spacing="lg"
                verticalSpacing="xl"
              >
                {productListData.data.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => (isRedirectToProduct.current = true)}
                  >
                    <ProductCard
                      id={item.id}
                      img={
                        item.productImages.length > 0
                          ? item.productImages[0].imageUrl
                          : ""
                      }
                      code={item.productCode}
                      name={item.name}
                      price={item.price}
                      status={item.productStatus}
                      origin={item.origin}
                    />
                  </div>
                ))}
              </SimpleGrid>
            </div>
            {productListData.data.length > 0 ? (
              <PaginationCustom
                total={productListData.totalPage}
                value={productListData.page}
                onChange={handleChangePage}
                className="mt-4"
                color="blue"
              />
            ) : (
              <div className="text-center">Không có sản phẩm nào</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
