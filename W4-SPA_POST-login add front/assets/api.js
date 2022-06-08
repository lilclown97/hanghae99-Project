// 완료
function getSelf(callback) {
    $.ajax({
        type: 'GET',
        url: 'users/me',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        success: function (response) {
            callback(response.user);
        },
        error: function (xhr, status, error) {
            if (status == 401) {
                alert('로그인이 필요합니다.');
            } else {
                localStorage.clear();
                alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
            }
            window.location.href = '/';
        },
    });
}

// 완료
function signOut() {
    localStorage.clear();
    window.location.href = '/';
}

function getGoodsDetail(goodsId, callback) {
    $.ajax({
        type: 'GET',
        url: `/api/posts/${goodsId}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        error: function (xhr, status, error) {
            if (status == 401) {
                alert('로그인이 필요합니다.');
            } else if (status == 404) {
                alert('존재하지 않는 상품입니다.');
            } else {
                alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
            }
            window.location.href = '/posts';
        },
        success: function (response) {
            callback(response.posts);
        },
    });
}

function makeBuyNotification(targetNickname, goodsName, goodsId, date) {
    const messageHtml = `${targetNickname}님이 방금 <a href="/detail.html?goodsId=${goodsId}" class="alert-link">${goodsName}</a>을 구매했어요! <br /><small>(${date})</small>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;
    const alt = $('#customerAlert');
    if (alt.length) {
        alt.html(messageHtml);
    } else {
        const htmlTemp = `<div class="alert alert-sparta alert-dismissible show fade" role="alert" id="customerAlert">${messageHtml}</div>`;
        $('body').append(htmlTemp);
    }
}

function addToCart(goodsId, quantity, callback) {
    $.ajax({
        type: 'PUT',
        url: `/api/posts/${goodsId}/cart`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
            quantity,
        },
        error: function (xhr, status, error) {
            if (status == 400) {
                alert('존재하지 않는 상품입니다.');
            }
            window.location.href = '/posts.html';
        },
        success: function () {
            callback();
        },
    });
}

function buyLocation(params) {
    sessionStorage.setItem('ordered', JSON.stringify(params));
    location.href = 'order.html';
}

function getCarts(callback) {
    $.ajax({
        type: 'GET',
        url: `/api/posts/cart`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        success: function (response) {
            callback(response.cart);
        },
    });
}

function deleteCart(goodsId, callback) {
    $.ajax({
        type: 'DELETE',
        url: `/api/posts/${goodsId}/cart`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        success: function () {
            callback();
        },
    });
}
