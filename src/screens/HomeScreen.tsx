import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';

import { getShops } from "../lib/firebase";
import { ShopReviewItem } from "../components/ShopReviewItem"
import { Shop } from '../types/shop';

export const HomeScreen = () => {

    // <Shop[]>typeScriptの型定義
    const [shops, setShops] = useState<Shop[]>([]);


    // useEffectは画面をレンダーした後に何らかの処理をしたい時に実行する
    // 第二引数に空の[]を入れると初期化時に一度だけ読み込む
    // []内の配列の値が変更される度に実行される
    useEffect(() => {
        getFirebaseItems();
    }, []);
    const getFirebaseItems = async () => {
        const shops = await getShops();
        setShops(shops)
    }; 

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={shops}
                renderItem={({ item }: { item: Shop }) => (
                    <ShopReviewItem shop={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
