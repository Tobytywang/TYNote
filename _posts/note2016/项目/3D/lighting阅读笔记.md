# Lighting.js阅读笔记
## 函数调用关系
create->createScene->showAxis
doPositionAnimationFunc->FillInner->wrapOriginSectionArray->fourUnion
                                                          ->unWrapOriginSectionArray
                       ->consoleSectionData
                       ->draw2dSection->addTexture
                                      ->draw2dData
                       ->deepCopy
loadAngular->draw2dData
