import './scss/styles.scss';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/presenter/events';
import { ServerApi } from "./components/api/ServerApi";
import { ApplicationState } from './components/model/AppData';
import { CatalogCard } from './components/view/CatalogCard';
import { ModalWindow } from './components/view/ModalWindow';
import { PopupCard } from './components/view/PopupCard';
import { BasketModal } from './components/view/BasketModal';
import { BasketItemBar } from './components/view/BasketItemBar';
import { OrderModal } from './components/view/OrderModal';
import { ContactsModal } from './components/view/ContactsModal';
import { SuccessModal } from './components/view/SuccessModal';
import { ContactsInfo, OrderInfo } from './types';

// Основные DOM-элементы главной страницы
const catalog = ensureElement<HTMLElement>('.gallery');
const basketAccessButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>('.header__basket-counter', basketAccessButton);
const page = ensureElement<HTMLBodyElement>('.page__wrapper');

// Presenter, Model и сервер-API
const events = new EventEmitter();
const appState = new ApplicationState(events);
const server = new ServerApi();

// Модальные окна
const modal = new ModalWindow(events);
const basket = new BasketModal(events);
const order = new OrderModal(events);
const contacts = new ContactsModal(events);

// Отслеживание всех сигналов для отладки
events.onAll((event) => {
    console.log(event.eventName);
})

// Открытие модального окна: основная область блокируется
events.on('modal:open', () => {
    page.classList.add('page__wrapper_locked');
});

// Закрытие модального окна: основная область может прокручиваться
events.on('modal:close', () => {
    page.classList.remove('page__wrapper_locked');
});

// Отрисовка элементов каталога при установке каталога
events.on('catalog:set', () => {
    appState.catalog.forEach((item) => catalog.appendChild(new CatalogCard(events).render(item)));
});

// Событие изменения содержимого корзины
events.on('basket:change', () => {
    basketCounter.textContent = `${appState.basket.length}`;

    basket.render({
        isDisabled: !appState.basketTotalSum,
        totalSum: String(appState.basketTotalSum),
        items: appState.basket.map((item, index) => 
            new BasketItemBar(events).render({
            ...item,
            index: index + 1
        }))
    });
});

// Открытие попапа карточки, а также проверка на наличие данного товара в корзине
events.on<{ id: string }>('catalogCard:click', ({ id }) => {
    const item = appState.getCatalogProductItemById(id);

    modal.render({
        content: new PopupCard(events).render({
            ...item,
            isDisabled: item.price === null || appState.basket.includes(item)
        })
    });
});

// Добавление карточки в корзину
events.on<{ id: string}>('catalogCard:addToBasket', ({ id }) => {
    appState.addToBusket(appState.getCatalogProductItemById(id));
    modal.close();
});

// Удаление товара из корзины
events.on<{ id: string }>('basketItem:remove', ({ id }) => appState.removeFromBasketById(id));

// Инициация процесса оформления заказа
events.on('busket:buy', () => modal.render({
    content: order.render(appState.validateOrderInfo())
}));

// Изменение модального окна с информацией о заказе
events.on<Partial<OrderInfo>>('order:change', (data) => {
    appState.user = { ...appState.user, ...data };
    order.render(appState.validateOrderInfo());
});

// Изменение модального окна с контактной информацией
events.on<Partial<ContactsInfo>>('contacts:change', (data) => {
    appState.user = { ...appState.user, ...data };
    contacts.render(appState.validateContactsInfo());
});

// Переход от информации о заказе к контактной информации
events.on('order:submit', () => modal.render({
    content: contacts.render(appState.validateContactsInfo())
}));

// Переход от контактной информации к размещению заказа
events.on('contacts:submit', () => {
    server.postOrder({
        payment: appState.user.payment,
        address: appState.user.address,
        email: appState.user.email,
        phone: appState.user.phone,
        total: appState.basketTotalSum,
        items: appState.basket.map((item) => item.id)
    })
    .then(() => {
        modal.render({
            content: new SuccessModal(events).render({
                totalSum: appState.basketTotalSum
            })
        });
        appState.clearBasket();
        appState.resetUser();
        order.reset();
        contacts.reset();
        events.emit('basket:change');
    })
    .catch(console.error);
});

// Нажатие на модальное окно об успешном размещении заказа
events.on('success:ok', () => {
    modal.close();
});

// Отрисовка модального окна корзины при нажатии на значок корзины
basketAccessButton.addEventListener('click', () => {
    modal.render({
        content: basket.render()
    });
});

// Получение карточек с сервера
server.getProductList()
    .then((data) => (appState.catalog = data.items))
    .catch(console.error);

// Проверка ответа сервера для отладки
console.log(server.getProductList());

console.log(fetch('https://larek-api.nomoreparties.co/api/weblarek/product', {
    headers: {'Content-Type': 'application/json' }, 
    method: 'GET'
}));