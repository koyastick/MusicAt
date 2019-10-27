# Music @

[![Product Name](image.png)](https://www.youtube.com/watch?v=G5rULR53uMk)

## 製品概要
### 世界×音楽×Tech

### 背景（製品開発のきっかけ、課題等）
JPHACKS2019のテーマは「X-Tech」でした。
最初Xに何を代入しようかと考えた時、私たちはただ単に何かにTeckを掛けるのではなく、何か二つのコンテンツを掛け合わせる為にTechを使おう、というモチベーションになりました。
そこで、私たちは音楽と世界に着目します。
音楽は古くから多くの人に好まれているコンテンツであり、音楽が持つポテンシャルは計り知れません。私たちの作品「Music @」はその「音楽」とあなたの「世界（位置, 時間）」とを繋ぎます。

### 製品説明（具体的な製品の説明）
このアプリはTechによって音楽と世界を繋ぎます。
あなたはマップ上で位置と時間を指定し、pinを落とすことで音楽を設定できます。
そして、その時間、その場所を通りかかると曲が流れはじめます。
あなたもお気に入りの場所、時間に、曲を置いてみてはどうでしょう。

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
* ピンをクリックで様々な情報を表示 ([a98c81e3d37785a3dae8dac765771362f31338b8](https://github.com/jphacks/SD_1905/commit/a98c81e3d37785a3dae8dac765771362f31338b8))

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
