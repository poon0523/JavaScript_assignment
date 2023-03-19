// 商品名と金額のリストをオブジェクト変数「ProductList」として作成
const ProductList =[
    {
    id: 1,
    name: "オリジナルブレンド200g",
    price: 500,
    },
    {
        id: 2,
        name: "オリジナルブレンド500g",
        price: 900, 
    },
    {
        id: 3,
        name: "スペシャルブレンド200g",
        price: 700,         
    },
    {
        id: 4,
        name: "スペシャルブレンド500g",
        price: 1200,         
    }
]

//HTMLから商品名×金額リストのidと個数を取得し、「追加する」「合計金額」のボタン処理の定義に利用できるようにする
//id=productが指定されている要素を任意の変数「PriceElement」に格納
const ProductElement = document.getElementById("product");
//id=quantityが指定されてい要素を任意の変数「QuantityElement」に格納
const QuantityElement = document.getElementById("quantity");
//商品名、商品金額、商品個数の情報を蓄積するための配列を任意の変数「purchases」に格納（※この時点で配列の中身は空）
let purchases=[];

//「追加する」ボタンを押下した際に動かす処理を定義する
function add(){
    // 「追加する」ボタンを押下した際に取得する情報を任意の変数に格納する
    // ブラウザから選択された商品名、商品金額の情報を変数に格納する
    const ListLink = parseInt(ProductElement.value); //商品リストと紐づく「id」を取得
    let products ="";
    ProductList.forEach((item) => {
        if(item.id === ListLink){
            products = ProductList[ListLink];
        }
    })
    // const products = ProductList.find(item => item.id == ListLink);
    // ブラウザから選択された商品名、商品金額の情報を変数に格納する
    const quantity = parseInt(QuantityElement.value);
    debugger

    let purchase ={  //商品金額と個数の情報をグローバル変数「purchases」に蓄積していくために、配列に蓄積したいデータをオブジェクト型のデータとして任意の変数「purchase」に格納
        products: products,
        quantity: quantity, 
    };

    // // すでに追加された商品か否かを判断するためのフラグを格納する変数を作成
    // //新規で追加される商品には「true」が入るように定義する
    // let newPurchase = true;

    // // 新規で追加される商品か否かを判断するためのメソッドを追加
    // purchases.forEach((item) => {
    //     if(item.price === purchase.price){
    //         newPurchase = false;
    //     }
    // })

    // // newPurchaseを用いて、新規で追加される商品は配列として追加し、すでに追加されている商品は数量を足し合わせる
    // if(purchases.length < 1 || newPurchase){
    //     purchases.push(purchase); //グローバル変数「purchases」にpurchaseのデータを追加（※pushは配列の最後に要素を追加するメソッド）
    // } else {
    //     // newPurchase=falseの場合にはpurchases配列の要素の中から合致する価格の商品を見つけ、その商品の数量に追加する数量を足し合わせる
    //     // indexの開始は0で、要素数の開始は1なので、index <= purchases.lengthとすると要素数の分、for文の繰り返し処理が実行できる
    //     for(let i = 0; i < purchases.length; i++){
    //         if(purchases[i].price === purchase.price){
    //             purchases[i].quantity += purchase.quantity;
    //         }
    //     }
    // }

    // findIndex()関数を使って記述する場合
    // 新規で追加される商品か否かを判断するためのフラグを作成するのではなく、「既存の商品の価格と一致する場合、その商品のindexを見つけ、newPurchaseに格納した上で条件指定に使う」という処理で対応する
    const newPurchase = purchases.findIndex((item) => item.products === purchase.products)
    if(purchase.length < 1 || newPurchase === -1){
        purchases.push(purchase);
    } else {
        purchases[newPurchase].quantity += purchase.quantity
    }

    window.alert(`${display()}\n小計${subtotal()}円`);

    // for(let i=0; i<=purchases.length; i++){
    //     if(purchases.length < 1 || purchases[i].price !== purchase.price){
    //         purchases.push(purchase); //グローバル変数「purchases」にpurchaseのデータを追加（※pushは配列の最後に要素を追加するメソッド）
    //         window.alert(`${display()}\n小計${subtotal()}円`);
    //     } else {
    //         purchases[i].quantity += purchase.quantity;
    //         window.alert(`${display()}\n小計${subtotal()}円`);
    //     }
    // }  
}

function display(){
    let string = "";
    for(let index = 0; index<purchases.length; index++){
        string += `${purchases[index].products.name} ${purchases[index].products.price}円:${purchases[index].quantity}点\n`;
    }
    return string;
}

function subtotal(){
    let subtotal = 0;
    for(let index = 0; index<purchases.length; index++){
        subtotal += purchases[index].products.price*purchases[index].quantity; 
    }
    return subtotal;
}


//「合計金額」ボタンを押下した際に動かす処理を定義する
function calc(){
    let sum = 0;
    let postgate = 0;
    for(let index = 0; index<purchases.length; index++){
        // sum += purchases[index].price * purchases[index].quantity;
        sum += purchases[index].products.price*purchases[index].quantity;
    }

    if(sum == 0 || sum >= 3000){
        postgate = 0
    } else if(sum < 2000){
        postgate = 500
    } else {
        postgate = 250
    }

    window.alert(`送料は${postgate}円です。合計は${sum + postgate}円です`);
    purchases = []; //新たな合計金額の計算の準備として計算に用いる変数を初期化する
    price =""; //新たな合計金額の計算の準備として計算に用いる変数を初期化する
    quantity=""; //新たな合計金額の計算の準備として計算に用いる変数を初期化する
}
