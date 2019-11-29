// 此处是传说中的监听区，但是我
//  看
//  不
//  懂
function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

// 三个render.
// 我们用新的state覆盖掉原先的state
function renderApp (newAppState, oldAppState = {}) {
  // 如果改动内容是一样的，就直接返回，不要占空间
  if (newAppState === oldAppState) return
  // 调用下面两个函数
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

// 第一部分title
function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  console.log('render app...')
  // 正常渲染操作
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

//同上
function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

// 修改state的数据
function stateChanger (state, action) {
  // 这是初始的state，为啥要if，我也不知道
  if (!state) {
    return {
      title: {
        text: "React.js 小书",
        color: "red"
      },
      content: {
        text: "React.js 小书内容",
        color: "blue"
      }
    }
  }
  // 哦，这里才是审核区
  switch (action.type) {
    // 没有完全理解switch和case，看过文档了，看过了。
    case 'UPDATE_TITLE_TEXT':
      // 如果符合的话，返回修改的内容？
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
      // 如果不是type，返回原来的state
    default:
      return state
  }
}
// store不知道几个意思
const store = createStore(appState, stateChanger)
// 但我知道oldstate是原来的数据，应该是store.getstate？？
let oldState = store.getState()
store.subscribe(() => {
  // newstate这个getstate又是啥
  const newState = store.getState()
  // 新的旧的数据都加载一下
  renderApp(newState, oldState)
  // 把新改好的替换上来
  oldState = newState
})

// 整体重新渲染
renderApp(store.getState());
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'sssssbook' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })


