# Music @
[![Music @](./images/thumbnail.png)](https://youtu.be/OEYtXuxBD4c)

## 製品概要
### 音楽×Techx世界

### 背景
JPHACKS2019のテーマは「X-Tech」でした。
最初Xに何を代入しようかと考えた時、私たちはただ単に何かにTechを掛けるのではなく、何か二つのコンテンツを掛け合わせる為にTechを使おう、というモチベーションとなりました。
そこで、私たちは音楽と世界に着目します。
音楽は古くから多くの人に好まれているコンテンツであり、音楽が持つポテンシャルは計り知れません。私たちの作品「Music @」はその「音楽」とあなたの「世界（位置, 時間）」とを繋ぎます。

### 製品説明
Music @はTechによって音楽と世界を繋ぐスマホアプリケーションです。
あなたはマップ上で位置と時間を指定し、ピンを落とすことで音楽を設定します。
そして、その時間、その場所を通りかかると曲が流れはじめます。
あなたもお気に入りの場所、時間に、曲を置いてみてはいかがでしょうか。

### 特長

#### 1. 特長1
場所、日時、時間を指定して音楽を設定できる
#### 2. 特長2
Spotify APIを用いて様々な曲から選ぶことができ、アルバムアートワークも表示することで視覚的にわかりやすい
#### 3. 特長3
React Native で開発しているのでAndroid OSへの移植も容易

### 解決出来ること
あなたの世界と音楽を繋ぐことで様々なコンテンツが生まれる

### 今後の展望
* 設定した音楽を他のユーザと共有
* 音楽会社との連携

## 開発内容・開発技術
### 活用した技術
#### API・データ
* Spotify API

#### フレームワーク・ライブラリ・モジュール
* React Native
* iOS

#### デバイス
* iPhone

### 独自開発技術（Hack Dayで開発したもの）
#### 2日間に開発した独自の機能・技術
* Spotify APIを用いた音楽選択性の拡張 ([fd4832c308f9e488f3a64b7995ddee44f328a4f3](https://github.com/jphacks/SD_1905/commit/fd4832c308f9e488f3a64b7995ddee44f328a4f3))

Spotify APIを利用することによって、端末に保存されていない曲を設定できるようにした。これにより、登録する曲の選択肢が広がる。また、未実装ではあるが、Spotify APIのSuggest機能を利用することで、ユーザーの嗜好に合わせて、「この場所、この時間に、こんな曲を流してみては？」という新たな形の提案ができるようになる。

* ピンをクリックで様々な情報を表示 ([a98c81e3d37785a3dae8dac765771362f31338b8](https://github.com/jphacks/SD_1905/commit/a98c81e3d37785a3dae8dac765771362f31338b8))

登録した音楽の情報や日時の設定を簡単に確認できるようにした。また、ピンの削除や移動、付与された情報の編集などは全て、ページを遷移することなく単一ページで行うことできる。
<iframe src="./images/image01.png" width="300" height="500"></iframe>

## How to build

### Requirements

* XCode
* React Native >= 0.61.2
* yarn >= 1.19.1

```
$ git clone git@github.com:koyastick/jphacks.git && cd ./jphacks
$ yarn
$ cd ios && pod install && cd ../
$ react-native run-ios --simulator="iPhone 8 Plus"
```

## How to use

\* 要Spotify プレミアムアカウント

* ピンを立てる画面でSpotifyにログイン
* マップにピンを立て、SpotifyURI、日付（オプショナル）、時間（オプショナル）を指定してセーブ
  * サンプルミュージックから選択も可能
  * SpotifyURI(または曲のURL)は、Spotifyアプリから曲を選択してコピー可能
* ピンの近くに移動すると曲が流れる！
