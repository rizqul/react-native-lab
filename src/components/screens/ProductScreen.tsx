import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { getProducts } from "../../service/product.service";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setError, setLoading, setLoadingMore, setRefreshing } from "../../store/slice/uiSlice";
import { MainTabParamList } from "../../utils/types/navigation";
import { Product } from "../../utils/types/product";
import useTheme from "../../hooks/useTheme";

type Props = NativeStackScreenProps<MainTabParamList, "Product">;

const ProductScreen = ({}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.isLoading);
  const refreshing = useAppSelector((state) => state.ui.isRefreshing);
  const loadingMore = useAppSelector((state) => state.ui.isLoadingMore);
  const { colors } = useTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const onRefresh = async () => {
    try {
      dispatch(setRefreshing(true));
      setPage(1);
      setHasMore(true);
      await fetchProduct(1, true);
    } finally {
      dispatch(setRefreshing(false));
    }
  };

  const fetchProduct = async (pageNum: number = 1, isRefresh: boolean = false) => {
    try {
      if (!refreshing && !isRefresh) {
        dispatch(setLoading(true));
      }
      const response = await getProducts({ page: pageNum, pageSize: 10 });

      if (isRefresh) {
        setProducts(response.data);
      } else {
        setProducts((prev) => (pageNum === 1 ? response.data : [...prev, ...response.data]));
      }

      setHasMore(pageNum < response.totalPages);
    } catch (error) {
      console.log("error fetch product : ", error);
      dispatch(setError("Gagal memuat products!"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadMore = async () => {
    if (!hasMore || loadingMore || loading) return;

    try {
      dispatch(setLoadingMore(true));
      const nextPage = page + 1;
      await fetchProduct(nextPage);
      setPage(nextPage);
    } catch (error: any) {
      console.log("Error loading more: ", error);
      dispatch(setError("Gagal memuat lebih banyak products"));
    } finally {
      dispatch(setLoadingMore(false));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading && products.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Loading ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="px-6 pt-8 pb-4">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          Products
        </Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item }) => (
          <View
            className="p-4 mb-3 rounded-xl"
            style={{
              backgroundColor: colors.card,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
              {item.productName}
            </Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                Stock: {item.stock}
              </Text>
              <Text className="text-base font-bold" style={{ color: colors.primary }}>
                Rp {item.productPrice.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text style={{ color: colors.textSecondary }}>Tidak ada Product</Text>
            </View>
          ) : undefined
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          ) : undefined
        }
      />
    </SafeAreaView>
  );
};

export default ProductScreen;
