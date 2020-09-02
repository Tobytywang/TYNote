# EasyWeChat
## 目录结构
使用`composer create-project overtrue/wechat`创建一个wechat的应用，其基本目录结构如下：
```
├── BACKERS.md
├── composer.json
├── composer.lock
├── LICENSE
├── README.md
├── src
│   ├── Broadcast
│   │   ├── Broadcast.php
│   │   ├── composer.json
│   │   ├── LICENSE.txt
│   │   ├── MessageBuilder.php
│   │   ├── README.md
│   │   └── Transformer.php
│   ├── Card
│   │   ├── Card.php
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   └── README.md
│   ├── Core
│   │   ├── AbstractAPI.php
│   │   ├── AccessToken.php
│   │   ├── composer.json
│   │   ├── Exception.php
│   │   ├── Exceptions
│   │   ├── Http.php
│   │   ├── LICENSE
│   │   └── README.md
│   ├── Device
│   │   ├── composer.json
│   │   ├── DeviceHttpException.php
│   │   ├── Device.php
│   │   ├── LICENSE
│   │   └── README.md
│   ├── Encryption
│   │   ├── composer.json
│   │   ├── EncryptionException.php
│   │   └── Encryptor.php
│   ├── Foundation
│   │   ├── Application.php
│   │   ├── Config.php
│   │   └── ServiceProviders
│   ├── Js
│   │   ├── composer.json
│   │   ├── Js.php
│   │   ├── LICENSE
│   │   └── README.md
│   ├── Material
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── Material.php
│   │   ├── README.md
│   │   └── Temporary.php
│   ├── Menu
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── Menu.php
│   │   └── README.md
│   ├── Message
│   │   ├── AbstractMessage.php
│   │   ├── Article.php
│   │   ├── composer.json
│   │   ├── DeviceEvent.php
│   │   ├── DeviceText.php
│   │   ├── Image.php
│   │   ├── Link.php
│   │   ├── Location.php
│   │   ├── Material.php
│   │   ├── Music.php
│   │   ├── News.php
│   │   ├── Raw.php
│   │   ├── README.md
│   │   ├── ShortVideo.php
│   │   ├── Text.php
│   │   ├── Transfer.php
│   │   ├── Video.php
│   │   └── Voice.php
│   ├── MiniProgram
│   │   ├── AccessToken.php
│   │   ├── Core
│   │   ├── Encryption
│   │   ├── Material
│   │   ├── MiniProgram.php
│   │   ├── Notice
│   │   ├── QRCode
│   │   ├── Server
│   │   ├── Staff
│   │   └── User
│   ├── Notice
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── Notice.php
│   │   └── README.md
│   ├── OpenPlatform
│   │   ├── AccessToken.php
│   │   ├── Components
│   │   ├── EventHandlers
│   │   ├── Guard.php
│   │   ├── OpenPlatform.php
│   │   ├── Traits
│   │   └── VerifyTicket.php
│   ├── Payment
│   │   ├── API.php
│   │   ├── composer.json
│   │   ├── helpers.php
│   │   ├── LICENSE
│   │   ├── LuckyMoney
│   │   ├── MerchantPay
│   │   ├── Merchant.php
│   │   ├── Notify.php
│   │   ├── Order.php
│   │   ├── Payment.php
│   │   └── README.md
│   ├── POI
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── POI.php
│   │   └── README.md
│   ├── QRCode
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── QRCode.php
│   │   └── README.md
│   ├── Reply
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── README.md
│   │   └── Reply.php
│   ├── Semantic
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── README.md
│   │   └── Semantic.php
│   ├── Server
│   │   ├── BadRequestException.php
│   │   ├── composer.json
│   │   ├── Guard.php
│   │   ├── LICENSE
│   │   ├── README.md
│   │   └── Transformer.php
│   ├── ShakeAround
│   │   ├── composer.json
│   │   ├── Device.php
│   │   ├── Group.php
│   │   ├── LICENSE
│   │   ├── Material.php
│   │   ├── Page.php
│   │   ├── README.md
│   │   ├── Relation.php
│   │   ├── ShakeAround.php
│   │   └── Stats.php
│   ├── Staff
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── MessageBuilder.php
│   │   ├── README.md
│   │   ├── Session.php
│   │   ├── Staff.php
│   │   └── Transformer.php
│   ├── Stats
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── README.md
│   │   └── Stats.php
│   ├── Store
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── Model
│   │   ├── README.md
│   │   └── Store.php
│   ├── Support
│   │   ├── Arr.php
│   │   ├── Attribute.php
│   │   ├── Collection.php
│   │   ├── composer.json
│   │   ├── File.php
│   │   ├── LICENSE
│   │   ├── Log.php
│   │   ├── README.md
│   │   ├── Str.php
│   │   ├── Url.php
│   │   └── XML.php
│   ├── Url
│   │   ├── composer.json
│   │   ├── LICENSE
│   │   ├── README.md
│   │   └── Url.php
│   └── User
│       ├── composer.json
│       ├── Group.php
│       ├── LICENSE
│       ├── README.md
│       ├── Tag.php
│       └── User.php
└── vendor
    ├── autoload.php
    ├── bin
    │   ├── phplint -> ../overtrue/phplint/bin/phplint
    │   └── phpunit -> ../phpunit/phpunit/phpunit
    ├── composer
    │   ├── autoload_classmap.php
    │   ├── autoload_files.php
    │   ├── autoload_namespaces.php
    │   ├── autoload_psr4.php
    │   ├── autoload_real.php
    │   ├── autoload_static.php
    │   ├── ClassLoader.php
    │   ├── installed.json
    │   └── LICENSE
    ├── doctrine
    │   ├── cache
    │   └── instantiator
    ├── guzzlehttp
    │   ├── guzzle
    │   ├── promises
    │   └── psr7
    ├── hamcrest
    │   └── hamcrest-php
    ├── mockery
    │   └── mockery
    ├── monolog
    │   └── monolog
    ├── overtrue
    │   ├── phplint
    │   └── socialite
    ├── phpdocumentor
    │   ├── reflection-common
    │   ├── reflection-docblock
    │   └── type-resolver
    ├── phpspec
    │   └── prophecy
    ├── phpunit
    │   ├── php-code-coverage
    │   ├── php-file-iterator
    │   ├── php-text-template
    │   ├── php-timer
    │   ├── php-token-stream
    │   ├── phpunit
    │   └── phpunit-mock-objects
    ├── pimple
    │   └── pimple
    ├── psr
    │   ├── http-message
    │   └── log
    ├── sebastian
    │   ├── comparator
    │   ├── diff
    │   ├── environment
    │   ├── exporter
    │   ├── global-state
    │   ├── recursion-context
    │   └── version
    ├── symfony
    │   ├── console
    │   ├── debug
    │   ├── finder
    │   ├── http-foundation
    │   ├── polyfill-mbstring
    │   ├── process
    │   ├── psr-http-message-bridge
    │   └── yaml
    └── webmozart
        └── assert
```
