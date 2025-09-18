# Git工作流
## 集中式工作流
## 功能分支工作流
功能分支工作流以集中式工作流为基础，不同的是为每一个工作流为基础，不同的是为各个功能分配一个专门的分支来开发。这样就可以把新功能集成到正式项目前，用Pull Requests的方式讨论变更。
### 工作方式
master分支代表了正式项目的历史。不直接提交本地记录到mater分支，开发者每次在开始新功能前先创建一个新分支。功能分支应该有个有描述性的名字。

在master分支和功能分支之间，Git是没有技术的区别，所以开发者可以用和集中式工作流中完全一样的方式编辑，暂存和提交修改到功能分支上。

另外，功能分支也可以（且应该）push到中央仓库中。**这样不修改正式代码就可以和其他开发者分享提交的功能**。由于master是仅有的一个特殊分支，中央仓库上存多个功能分支不会有任何问题。当然，这样做也可以很方便的备份各自的本地提交。

### Pull Requests
功能分支除了可以隔离功能分开发，也使得通过Pull Requests讨论变更成为可能。一旦某个开发完成了一个功能，不是立即合并到master，而是push到中央仓库的功能分支上并发起一个Pull Requests请求去合并修改到master。在修改成为主干代码前，这让其他的开发者有机会先去Review变更。

### 操作流程
```
git checkout master
git pull
git pull origin marys-feature
git push
```

## Gitflow工作流
### 工作方式
Gitflow工作流仍然用中央仓库作为所有开发者的交互中心。和其他的工作流一样，开发者在本地工作并push分支到中央仓库中。

### 历史分支
相对使用仅有的一个master分支，Gitflow工作流使用2个分来记录项目的历史。
master分支存储了正式发布的历史，而develop分支作为功能的集成分支。
这样也方便master分支上的所有提交分配一个版本。

### 功能分支
新的功能位于一个自己的分支，这样可以push到中央仓库以备份和协作。
但新功能分支不是从master分支上拉出新分支，而是使用develop分支作为自己的父分支。
当新功能完成时，会合并到develop分支。

**注意**：从某种含义和目的上来看，功能分支加上develop分支就是功能分支工作流的用法。
但Gitflow工作流并没有在这里止步。

### 发布分支
一旦develop分支上有了做一次发布（后者说到了既定的发布日期）的足够功能，就从develop分支上fork一份发布分支。
新建的分支用于开始发布循环，所以从这个时间点开始之后的新的功能不能在加到这个分支上——这个分支应该叫做Bug修复、文档生成和其他面向发布的任务。
一旦对外发布的工作都完成了，发布分支合并到master分支并分配一个版本号打好Tag。
另外，这些从新建发布分支以来要做的的修改要合并回Develop分支。

使用一个用于发布准备的专门分支，使得一个团队可以在完善当前的发布版本的同时，另一个团队可以继续开发下一个版本的功能。

常用的分支约定

> 用于新建发布分支的分支：develop
用于合并的分支：master
分支命令：release-\*或者release/*

### 维护分支
维护分支或者说是热修复（hotfix）分支用于快速给产品发布版本打补丁，这是唯一可以直接从master分支fork出来的分支。
修复完成，修改应该马上合并回master分支和develop分支（当前的发布分支），master分支应该用新的版本号打好Tag。

### 开发流程
```
git branch develop
git push -u origin develop
```
```
git clone ssh://user@hosst/path/to/repo.git
git checkout -b develop origin/develop
```
```
git checkout -b some-feature develop
```
```
git pull origin develop
git checkout develop
git merge some-feature
git push
git branch -d some-feature
```
```
git checkout -b release-0.1 develop
```
```
git checkout master
git merge release-0.1
git push
git checout develop
git merge release-0.1
git push
git branch -d release-0.1
```
```
git tag -a 0.1 -m "Initial public release" master
git push --tags
```
Git有提供各种勾子，即仓库有时间发生时触发的脚本。
可以设置一个钩子，在你push中央仓库的master分支时，自动构建好对外发布。

用户发现bug
```
git checkout -b issue-#001 master
# Fix the bug
git checout master
git merge issue-#001
git pushh
```
```
git checout develop
git merge issue-#001
git push
git branch -d issue-#001
```
## Forking工作流
Forking工作流是分布式工作流，充分李永乐Git在分支和克隆上的优势。
可以安全的管理大团队的开发者，并能接受不受信任贡献者的提交。

Forkong工作流和前面讨论的几种工作流有根本的不同，这种工作流不是使用单个服务器仓库来作为中央代码基线，而是让各个开发者都有一个服务器端仓库。
这意味着各个代码贡献者有两个Git仓库而不是1个：一个是本地私有的，另一个是服务器端公开的。

### 工作方式

## Pull Requests
