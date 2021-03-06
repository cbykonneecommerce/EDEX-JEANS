var fns = {
    lightboxOverlay: $('<div class="lightboxOverlay"></div>'),
    lightboxBlock: $('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>'),
    lightbox: function(content, width, height) {
        $(content).appendTo(".lightboxInner");
        var pageHeight = $(window).height(),
            pageWidth = $(window).width(),
            contentWidth = width,
            contentHeight = height,
            maxWidthContent = .8 * pageWidth,
            maxHeightContent = .8 * pageHeight;
        if (contentWidth > maxWidthContent);
        else;
        if (contentHeight > maxHeightContent);
        else;
        $(".lightboxOverlay").css({
            position: "fixed",
            top: "0",
            left: "0",
            "background-color": "rgba(0,0,0,0.6)",
            height: "100%",
            width: "100%",
            "z-index": "5005"
        }), $(".lightboxOverlay").addClass("open"), $(".lightboxClose").click(function() {
            $(".lightboxOverlay").removeClass("open"), $(".lightboxInner").empty()
        }), $(".lightboxOverlayInner").click(function() {
            $(".lightboxOverlay").removeClass("open"), $(".lightboxInner").empty()
        })
    },
    tabs: function() {
        $(".tabNav").on("click", ".tabLink", function() {
            var ref = $(this).attr("data-ref");
            $(".tabLink, .tabContent").removeClass("active"), $(this).addClass("active"), $(".tabsItems").find("." + ref).addClass("active")
        })
    },
    shareWindow: function(urlProduct, urlMediaProduct) {
        var facebook = "https://www.facebook.com/sharer/sharer.php?u=" + urlProduct,
            twitter = "https://twitter.com/home?status=" + urlProduct,
            pinterest = "https://pinterest.com/pin/create/button/?url=" + urlProduct + "&media=" + urlMediaProduct,
            gplus = "https://plus.google.com/share?url=" + urlProduct;
        $(".shareProduct .facebook").attr("href", facebook), $(".shareProduct .twitter").attr("href", twitter), $(".shareProduct .pinterest").attr("href", pinterest), $(".shareProduct .gplus").attr("href", gplus), $(".shareProduct a").on("click", function() {
            return newwindow = window.open($(this).attr("href"), "", "height=400,width=400"), window.focus && newwindow.focus(), !1
        })
    },
    isMobile: function() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1) return !0
    },
    verifyWidth: function() {
        return $(window).width() <= 1024 ? ($("body").addClass("isMobile"), $("body").removeClass("notMobile"), !0) : ($("body").removeClass("isMobile"), $("body").addClass("notMobile"), !1)
    },
    imageFull: function() {
        $(".fullGallery .box-banner").each(function() {
            var bImg = $(this).find("img").attr("src");
            $(this).find("a").attr("style", "background-image:url(" + bImg + ");background-repeat: no-repeat; background-position: center;"), $(this).find("img").remove()
        })
    },
    numberWithCommas: function(x) {
        var parts = x.toString().split(".");
        return parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), parts.join(".")
    },
    formatMoney: function(input, discount) {
        var discountInput, configCurrency = {
            currencySymbol: "R$"
        };
        discountInput = discount ? discount.replace("%", "") : 0;
        var value = input.toString();
        value = value.replace("R$ ", "").replace(".", ""), value = parseFloat(value.replace(",", ".")), value *= (100 - discountInput) / 100, value = value.toFixed(2), value = value.toString(), value = value.split(".");
        var valueInt = fns.numberWithCommas(value[0]),
            valueCents = value[1];
        return configCurrency.currencySymbol + " " + valueInt + "," + valueCents
    },
    ytPlayer: function(el, thumbnail) {
        "use strict";
        thumbnail || (thumbnail = "sddefault"), $(el + " .youtube").each(function() {
            $(this).css("background-image", "url(http://i.ytimg.com/vi/" + this.id + "/" + thumbnail + ".jpg)"), $(document).delegate("#" + this.id, "click", function() {
                var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
                $(this).data("params") && (iframe_url += "&" + $(this).data("params"));
                var iframe = $("<iframe/>", {
                    frameborder: "0",
                    src: iframe_url,
                    width: $(this).width(),
                    height: $(this).height()
                });
                $(this).replaceWith(iframe)
            }), $("#" + this.id).click()
        })
    }
},
global = {
    userLogged: function() {
        vtexjs.checkout.getOrderForm().done(function(data) {
            data.loggedIn && ($(".welcomeMsg").each(function() {
                $(this).addClass("userLogged"), $(".entrar").html("Minha conta")
            }), $(".accountMobileNav").show())
        })
    },
    menu: function() {
        $(".pageNav .menu-departamento > ul").each(function() {
            $(this).find("li").length ? $(this).wrap($("<div>", {
                "class": "submenu"
            })).wrap($("<div>", {
                "class": "submenuWrap"
            })) : $(this).remove()
        }), $(".pageNav .menu-departamento h3").each(function() {
            var depClass = $(this).removeClass("even").attr("class"),
                that = $(this),
                iconOpenSubmenu = '<i class="ico-expand"></i>';
            that.next(".submenu").length && (that.next(".submenu").attr("id", depClass), that.addClass("hasSubmenu"), that.append(iconOpenSubmenu))
        }), $(".pageNav .menu-departamento h3").each(function(index) {
            $(this).css("display", "inline-block")
        })
    },
    menuOver: function() {
        function hideMenuSubItems(o) {
            o.stop(!0, !0).fadeOut(300)
        }
        var menuOutObject, menuOutTimer;
        $(".pageNav .menu-departamento h3").hover(function() {
            fns.verifyWidth() || (menuOutObject = $(this).next(".submenu"), menuOutObject.is(":visible") || hideMenuSubItems($(".pageNav .menu-departamento .submenu:visible")), clearTimeout(menuOutTimer), menuOutObject.fadeIn(300), $(this).hasClass("hasSubmenu") ? $(".mainOverlay").addClass("active") : $(".mainOverlay").removeClass("active"), $(".toggleSearch, .searchBox").removeClass("active"))
        }, function() {
            menuOutTimer = setTimeout(function() {
                fns.verifyWidth() || (hideMenuSubItems(menuOutObject), $(".mainOverlay").removeClass("active"))
            }, 10)
        }), $(".pageNav .menu-departamento .submenu").hover(function() {
            fns.verifyWidth() || (menuOutObject = $(this), clearTimeout(menuOutTimer))
        }, function() {
            menuOutTimer = setTimeout(function() {
                fns.verifyWidth() || (hideMenuSubItems(menuOutObject), $(".mainOverlay").removeClass("active"))
            }, 10)
        }), fns.verifyWidth() || ($(".pageNav .menu-departamento .submenu").mouseover(function() {
            $(this).find("h3").addClass("active")
        }), $(".pageNav .menu-departamento .submenu").mouseout(function() {
            $(this).find("h3").removeClass("active")
        }))
    },
    menuToggle: function() {
        $(".menu-mobile-toggle").on("click", function(e) {
            fns.verifyWidth() && (e.preventDefault(), $(".navOverlay").addClass("active"), $(".pageNav").addClass("open"), $("body").addClass("menuOpen"))
        }), $(".navHead .ico-close").on("click", function(e) {
            fns.verifyWidth() && (e.preventDefault(), $(".navOverlay").removeClass("active"), $(".pageNav").removeClass("open"), $("body").removeClass("menuOpen"))
        }), $(".menu-departamento h3").on("click", function(e) {
            if (fns.verifyWidth()) {
                e.preventDefault();
                var that = $(this),
                    depLink = that,
                    submenu = depLink.next();
                submenu.hasClass("submenuOpen") ? (that.find(".ico-expand").removeClass("active"), depLink.removeClass("active"), submenu.removeClass("submenuOpen").stop(!0, !0).hide(300)) : ($(".submenu").removeClass("submenuOpen").stop(!0, !0).hide(300), $(".menu-departamento .ico-expand").removeClass("active"), $(".menu-departamento h3").removeClass("active"), that.find(".ico-expand").addClass("active"), depLink.addClass("active"), submenu.addClass("submenuOpen").stop(!0, !0).show(300))
            }
        })
    },
    loadBannerMenu: function() {
        var submenu = $(".pageNav .menu-departamento .submenu");
        submenu.each(function() {
            var _this = $(this),
                submenuId = _this.attr("id");
            _this.find(".submenuWrap").append('<div class="bannerMenu"></div>'), _this.find(".bannerMenu").load("/bannermenu #" + submenuId, function(response, status, xhr) {
                "error" == status ? console.log("Erro ao carregar banner" + submenuId) : _this.addClass("hasBanner")
            })
        })
    },
    toggleSearch: function() {
        $(".toggleSearch > i").on("click", function(e) {
            e.preventDefault(), $(".toggleSearch, .searchBox, .mainOverlay").toggleClass("active")
        }), $(".searchBox .action a").on("click", function(e) {
            e.preventDefault(), $(".toggleSearch, .searchBox, .mainOverlay").removeClass("active")
        })
    },
    autocompleteClone: function() {
        $(".ui-autocomplete").appendTo(".searchBox"), $(".ui-autocomplete").unbind(), $(".ui-autocomplete li").each(function() {
            if ($(this).find("img").length > 0) {
                $(this).find("a").wrapInner("<span/>"), $(this).find("a").prepend($(this).find("img")), $(this).addClass("hasImage");
                var imgSrc = $(this).find("img").attr("src").replace("25-25", "265-265");
                $(this).find("img").attr("src", imgSrc).prop("width", "265").prop("height", "265")
            }
        }), $(".hasImage").wrapAll('<ul class="product-found"></ul>')
    },
    footerMenuToggle: function() {
        $(".toggle h3").on("click", function(e) {
            e.preventDefault();
            var that = $(this),
                itemContent = that.parent().find(".itemContent");
            $(window).width() <= 720 && (itemContent.hasClass("active") ? (that.removeClass("active"), itemContent.stop(!0, !0).hide(300).removeClass("active")) : ($(".toggle h3").parent().find(".itemContent").stop(!0, !0).hide(300).removeClass("active"), itemContent.addClass("active").stop(!0, !0).show(300), $(".toggle h3").removeClass("active"), that.addClass("active")))
        })
    },
    newsletter: function() {
        function closeNews() {
            $(".lightboxOverlay").fadeOut(500, function() {
                $(this).remove()
            }), $.cookie("newsletter", "ok", {
                path: "/",
                expires: 10
            })
        }
        $.cookie("newsletter") || fns.isMobile() || (newsLightbox = $(".newsLightbox"), fns.lightboxOverlay.appendTo("body"), fns.lightboxBlock.appendTo(".lightboxOverlay"), fns.lightbox(newsLightbox, 835, 555), $(".contentLightbox .closeModal").click(function(e) {
            e.preventDefault(), closeNews()
        })), ("ok" == $.cookie("newsletter") || fns.isMobile()) && $(".newsLightbox").remove()
    },
    newsletterRegister: function() {
        $('.newsletter input[type="button"]').on("click", function(e) {
            function validateEmail(email) {
                var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                return re.test(email)
            }
            e.preventDefault();
            var _that = $(this),
                btnVal = _that.val(),
                parent = _that.parents("fieldset"),
                nameUser = parent.find("#ClientName").val(),
                emailUser = parent.find("#ClientEmail").val(),
                cupon = "BOASVINDAS17";
            if (_that.val("Aguarde...").prop("disabled", !0), nameUser.length > 0)
                if (validateEmail(emailUser)) {
                    vtexjs.checkout.getOrderForm().then(function(orderForm) {
                        $.ajax({
                            headers: {
                                Accept: "application/vnd.vtex.ds.v10+json",
                                "Content-Type": "application/json",
                                "REST-Range": "resources=0-1"
                            },
                            type: "GET",
                            url: "//api.vtexcrm.com.br/edexjeans/dataentities/NL/search?_fields=id,email&_where=email=" + emailUser
                        }).done(function(clientInfo) {
                            if (0 == clientInfo.length) {
                                var jsonData = {
                                    name: nameUser,
                                    email: emailUser
                                };
                                $.ajax({
                                    url: "https://api.vtexcrm.com.br/edexjeans/dataentities/NL/documents/",
                                    dataType: "json",
                                    type: "PATCH",
                                    crossDomain: !0,
                                    data: JSON.stringify(jsonData),
                                    headers: {
                                        Accept: "application/vnd.vtex.ds.v10+json",
                                        "Content-Type": "application/json; charset=utf-8"
                                    },
                                    success: function(emailUser) {
                                        $(parent).find(".newsLightbox").addClass("registred"), $(parent).find(".campos").hide(), $(parent).find(".success span").text(cupon), $(parent).find(".success").show(), _that.val(btnVal).prop("disabled", !1)
                                    }
                                })
                            } else $(parent).find(".duplicate").show(), $(parent).find(".campos").hide(), _that.val(btnVal).prop("disabled", !1)
                        })
                    })
                } else $(parent).find(".server").show(), $(parent).find(".campos").hide(), _that.val(btnVal).prop("disabled", !1);
            else $(parent).find(".server").show(), $(parent).find(".campos").hide(), _that.val(btnVal).prop("disabled", !1)
        }), $(".tryAgain").on("click", function(e) {
            e.preventDefault();
            var parent = $(this).parents("fieldset");
            $(parent).find(".erro").hide(), $(parent).find(".campos").show()
        })
    },
    init: function() {
        global.menu(), global.menuOver(), global.menuToggle(), global.loadBannerMenu(), global.toggleSearch(), global.footerMenuToggle(), global.newsletter(), global.newsletterRegister(), $(window).load(function() {
            global.userLogged()
        }), $(document).ajaxStop(function() {
            global.autocompleteClone()
        })
    }
},
slider = {
    fullSlider: function() {
        $(".mainGallery").slick({
            dots: !0,
            arrows: !0,
            pauseOnHover: !1,
            autoplay: !0,
            speed: 1e3,
            autoplaySpeed: 5e3,
            responsive: [{
                breakpoint: 720,
                settings: {
                    dots: !1,
                    arrows: !1
                }
            }]
        })
    },
    fullSliderTabs: function(dots, arrows) {
        var arrayDots = [];
        $(".fullGallery .box-banner").each(function() {
            var bImg = $(this).find("img").attr("src");
            if ($(this).find("a").attr("style", "background:url(" + bImg + ") no-repeat center;"), !$(this).hasClass("slick-cloned")) {
                var dotText = $(this).find("img").attr("alt");
                arrayDots.push(dotText)
            }
            $(this).find("img").remove()
        }), $(".mainGallery").slick({
            dots: dots,
            arrows: arrows,
            pauseOnHover: !1,
            autoplay: !1,
            autoplaySpeed: 4e3
        }), $(".mainGallery .slick-dots li").each(function(i) {
            $(this).find("button").text(arrayDots[i])
        })
    },
    singleSlider: function(dots, arrows) {
        $(".mainGallery").slick({
            dots: dots,
            arrows: arrows,
            pauseOnHover: !1,
            autoplay: !0,
            autoplaySpeed: 4e3
        })
    },
    shelfSlider: function(dots, arrows, toShowInitial, toScrollInitial, toShow_T, toScroll_T, toShow_M, toScroll_M) {
        $(".shelfCarousel").each(function() {
            $(this).find("ul").slick({
                dots: dots,
                arrows: arrows,
                slidesToShow: toShowInitial,
                slidesToScroll: toScrollInitial,
                pauseOnHover: !1,
                autoplay: !1,
                autoplaySpeed: 6e3,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        autoplay: !0,
                        slidesToShow: toShow_T,
                        slidesToScroll: toScroll_T
                    }
                }, {
                    breakpoint: 720,
                    settings: {
                        autoplay: !0,
                        slidesToShow: toShow_M,
                        slidesToScroll: toScroll_M,
                        dots: !0,
                        arrows: !1
                    }
                }]
            })
        })
    },
    shelfSimilar: function(dots, arrows, toShowInitial, toScrollInitial, toShow_T, toScroll_T, toShow_M, toScroll_M) {
        $(".similar").each(function() {
            $(this).find("ul").slick({
                dots: dots,
                arrows: arrows,
                slidesToShow: toShowInitial,
                slidesToScroll: toScrollInitial,
                pauseOnHover: !1,
                autoplay: !1,
                autoplaySpeed: 6e3,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: toShow_T,
                        slidesToScroll: toScroll_T
                    }
                }, {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: toShow_M,
                        slidesToScroll: toScroll_M,
                        dots: !0,
                        arrows: !1
                    }
                }]
            })
        })
    },
    multipleSlider: function(slidesToShow, slidesToScroll, vertical) {
        $(".carouselGallery").slick({
            infinite: !0,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            speed: 500,
            vertical: vertical
        })
    }
},
home = {
    youtubeBackground: function() {
        "" != $("#videoBackground").html() && ($(".mainGallery.fullGallery").hide(), fns.ytPlayer("#videoBackground", "maxresdefault"), $("#videoBackground").show())
    },
    instagramFeed: function() {
        var feed = new Instafeed({
            target: "instagram",
            get: "user",
            userId: 1152529769,
            accessToken: "1152529769.1677ed0.9e6802db32d040a88ab8d9c18cb96bf9",
            link: "true",
            limit: "6",
            resolution: "standard_resolution",
            template: '<div class="instaItem"><a href="{{link}}" class="instagram-{{orientation}}" target="_blank"><img src="{{image}}" /></a></div>'
        });
        window.onload = function() {
            feed.run()
        }
    },
    init: function() {
        home.youtubeBackground(), home.instagramFeed()
    }
},
catalog = {
    smartResearch: function() {
        $(".navTopbar .filterOptions input[type='checkbox']").vtexSmartResearch({
            ajaxCallback: function() {
                $("li.helperComplement").remove()
            },
            shelfCallback: function() {
                $("li.helperComplement").remove()
            }
        })
    },
    filterChoosed: function() {
        function click(classElement) {
            $(".filter").on("click", function() {
                var classFilter = $(this).attr("class");
                classFilter = classFilter.replace("filter ", ""), $(".refino label.sr_selected").each(function() {
                    $(this).hasClass(classFilter) && $(this).trigger("click")
                })
            })
        }
        $('<div class="filterChoosed"><span class="btnClean"><i class="ico-close"></i> Limpar Filtros</span></div>').insertBefore(".main"), $(".refino label").unbind("click"), $(".refino input:checkbox").change(function() {
            var text = $(this).parent("label").text(),
                className = $(this).parent("label").attr("class");
            if (className = className.replace(" sr_selected", ""), $(this).is(":checked")) {
                var template = '<div class="filter ' + className + '" data-class="' + className + '"><i class="ico-close"></i> ' + text + "</div>";
                $(template).insertBefore(".filterChoosed .btnClean"), click(className)
            } else $('.filterChoosed .filter[data-class="' + className + '"]').remove()
        }), $(".btnClean").on("click", function() {
            $(".refino label.sr_selected").each(function() {
                $(this).trigger("click"), $(".filter").remove()
            })
        })
    },
    textItemDepartament: function(element) {
        for (var regexpItens = /\({1}([0-9])*?\){1}/g, i = 0; i < element.length; i++) {
            var newText = $(element[i]).text().replace(regexpItens, "");
            $(element[i]).text(newText)
        }
    },
    groupFilters: function() {
        catalog.textItemDepartament($(".navTopbar .filterOptions h4 a")), $(".navTopbar .filterOptions .search-single-navigator h4").next("ul").remove(), $(".navTopbar .filterOptions .search-single-navigator h4").wrapAll("<fieldset class='filterCategory'></fieldset>"), $(".filterCategory").prepend("<h5>Categorias</h5>"), $(".filterCategory h4").wrapAll("<div></div>"), $(".filterCategory").prependTo(".search-multiple-navigator"), $(".orderBy").find('option[value=""]').html("Ordenar por"), $(".shelfInteraction").prepend($(".orderBy").eq(0)), $(".navTopbar").fadeIn()
    },
    groupFiltersToggle: function() {
        $("fieldset > h5").on("click", function(e) {
            e.preventDefault(), $(this).parent().hasClass("active") ? ($(this).parent().removeClass("active"), fns.verifyWidth() ? $(this).parent().find("div").hide() : $(this).parent().find("div").hide()) : ($(this).parent().addClass("active"), fns.verifyWidth() ? $(this).parent().find("div").show() : $(this).parent().find("div").show())
        }), $(document).mouseup(function(e) {
            $(".search-multiple-navigator fieldset, .search-multiple-navigator fieldset, .shelfInteraction fieldset").each(function() {
                if ($(this).parent().addClass("active")) {
                    var container = $(this);
                    container.is(e.target) || 0 !== container.has(e.target).length || (container.removeClass("active"), fns.verifyWidth() ? container.find("div").hide(300) : container.find("div").fadeOut(300))
                }
            })
        })
    },
    menuFilterToggle: function() {
        $(".filterMobileToggle").on("click", function(e) {
            fns.verifyWidth() && (e.preventDefault(), $(".navTopbar").addClass("open"), $("body").addClass("menuOpen"), $(".navOverlay").addClass("active"))
        }), $(".navTopbarHead .ico-close").on("click", function(e) {
            fns.verifyWidth() && (e.preventDefault(), $(".navTopbar").removeClass("open"), $("body").removeClass("menuOpen"), $(".navOverlay").removeClass("active"))
        })
    },
    groupFiltersCategories: function() {
        catalog.textItemDepartament($(".navTopbar .filterOptions h3 a")), $(".navTopbar .filterOptions .search-single-navigator h3").next("ul").remove(), $(".navTopbar .filterOptions .search-single-navigator h3").wrapAll("<fieldset class='filterCategory'></fieldset>"), $(".filterCategory").prepend("<h5>Categorias</h5>"), $(".filterCategory h3").wrapAll("<div></div>"), $(".filterCategory").prependTo(".search-multiple-navigator"), $(".orderBy").find('option[value=""]').html("Ordenar por"), $(".shelfInteraction").prepend($(".orderBy").eq(0)), $(".navTopbar").fadeIn()
    },
    emptySearch: function() {
        var word = window.location.search.split("?ft=")[1].split("&")[0];
        $(".box-emptySearch h3 span em").text(word)
    },
    identifySearchPage: function() {
        var url = window.location.pathname.split("/");
        2 == url.length && ($("body").addClass("firstLevel"), catalog.searchResult(), catalog.searchBradCrumb())
    },
    searchBradCrumb: function() {
        var searchString = $(".searchResultsTime .resultado-busca-termo .value").eq(0).text(),
            templateLink = $('<li class="last"><a href="/">Busca: ' + searchString + " X</a></li>");
        $(".bread-crumb ul").append(templateLink)
    },
    searchResult: function() {
        var searchString = $(".searchResultsTime .resultado-busca-termo .value").eq(0).text(),
            numberResult = $(".searchResultsTime .resultado-busca-numero .value").eq(0).text();
        $(".searchDisplay").append('<p>Encontramos <span>"' + numberResult + '"</span> resultados para <span>"' + searchString + '"</span></p>')
    },
    numberResult: function() {
        var numberResult = $(".searchResultsTime .resultado-busca-numero .value").eq(0).text();
        $(".productResult").append("<span>" + numberResult + " produtos</span>")
    },
    init: function() {
        catalog.smartResearch(), catalog.numberResult(), $("body").hasClass("searchResult") ? (catalog.groupFiltersCategories(), catalog.identifySearchPage()) : (catalog.groupFilters(), catalog.filterChoosed()), catalog.groupFiltersToggle(), catalog.menuFilterToggle()
    }
},
product = {
    bildBuyButton: function() {
        var $btnComprar = $(".buy-button").eq(0);
        $btnComprar.html("Adicionar ao carrinho");
        $btnComprar.attr('id', 'cartbtn');
        var $btnComprar = $(".buy-in-page-button").eq(0).html("Comprar");
       $btnComprar.html("Comprar");
       $btnComprar.addClass( "buy-button" );
    },
    mobileZoom: function() {
        $(".mainProductImage").append('<div class="ico-zoom"></div>'), console.log("zoom-mob");
        var htmlModal = '<div id="zoomModal" style="display:none">';
        htmlModal += '<i class="ico-close"></i>', htmlModal += '<img src="" alt=""/>', htmlModal += "</div>", $(".mainProductImage .ico-zoom").on("click", function() {
            var imgZoomUrl = $(".thumbs .slick-current img").attr("src");
            $("body").append(htmlModal), $("#zoomModal img").attr("src", imgZoomUrl.replace("512-700", "1024-1400")), setTimeout(function() {
                $("#zoomModal").fadeIn(300)
            }, 250), $("#zoomModal .ico-close").on("click", function(event) {
                event.preventDefault(), $("#zoomModal").fadeOut(300), setTimeout(function() {
                    $("#zoomModal").remove()
                }, 250)
            })
        })
    },
    share: function() {
        var urlProduct = window.location.href,
            urlMediaProduct = $("#image img").attr("src");
        fns.shareWindow(urlProduct, urlMediaProduct)
    },
    doubleZoom: function() {
        var cloneThumbs = $(".mainProductImage .apresentacao ul.thumbs").clone();
        $(".mainProductImage .apresentacao").html(cloneThumbs), $(".mainProductImage .apresentacao ul.thumbs li img").each(function() {
            var thisImage = $(this).attr("src");
            $(this).parents("li").attr("data-thumb", thisImage.replace("-55-55", "-320-320")), $(this).parents("li").html('<img src="' + thisImage.replace("-55-55", "-680-680") + '"/>')
        }), $(".mainProductImage .apresentacao ul.thumbs li").size() > "1" ? ($(".mainProductImage .apresentacao ul.thumbs").slick({
            dots: !1,
            arrows: !0,
            infinite: !0,
            autoplay: !1,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !0,
                    arrows: !1
                }
            }]
        }), $(".mainProductImage .apresentacao ul.thumbs .slick-list li").each(function() {
            var thisImg = $(this).find("img").attr("src").replace("292-292", "1000-1000");
            window.innerWidth <= 1024 ? $(this).trigger("zoom.destroy") : $(this).zoom({
                url: "" + thisImg
            })
        })) : ($(".mainProductImage .apresentacao ul.thumbs").css({
            textAlign: "center"
        }), $(".mainProductImage .apresentacao ul.thumbs li img").addClass("unica")), $(".mainProductImage .apresentacao").fadeIn()
    },
    changeSku: function() {
        $(window).on("skuDimensionChanged.vtex", function() {
            $(".apresentacao").hide().css("opacity", "0"), $(".apresentacao ul.thumbs").hasClass("slick-initialized") && $(".apresentacao ul.thumbs").slick("unslick"), setTimeout(function() {
                product.doubleZoom(), product.productUnaviable(), $(".mainProductImage").attr("style", ""), $(".apresentacao").show().css("opacity", "1")
            }, 1e3), $(".apresentacao").show()
        })
    },
    productUnaviable: function() {
        "" == $(".productPrice .descricao-preco").text() && ($("body").addClass("productUnaviable"), $(".sku-notifyme-button-ok").val("Avise-me")), $(".chooseProduct input").on("change", function() {
            "" == $(".productPrice .descricao-preco").text() ? ($("body").addClass("productUnaviable"), $(".sku-notifyme-button-ok").val("Avise-me")) : $("body").removeClass("productUnaviable")
        })
    },
    productCalcDiscount: function() {
        var discountCashPercentage = "5%";
        $(".price-cash").html(fns.formatMoney(skuJson.skus[0].bestPriceFormated, discountCashPercentage) + " (5% de desconto) no boleto")
    },
    infoAccordion: function() {
        $(".accordionMobile h3").on("click", function(e) {
            e.preventDefault();
            var that = $(this),
                itemContent = that.parent().find(".itemContent");
            itemContent.hasClass("active") ? (that.removeClass("active"), itemContent.stop(!0, !0).hide(300).removeClass("active")) : ($(".accordionMobile h3").parent().find(".itemContent").stop(!0, !0).hide(300).removeClass("active"), itemContent.addClass("active").stop(!0, !0).show(300), $(".accordionMobile h3").removeClass("active"), that.addClass("active"))
        })
    },
    init: function() {
        product.bildBuyButton(), product.share(), product.mobileZoom(), product.changeSku(), product.productUnaviable(), product.infoAccordion(), $("body").hasClass("kit") || (product.productCalcDiscount(), $("#divCompreJunto table").length && (buyTogether.buildBuyTogether(), setTimeout(function() {
            buyTogether.changeSkuBuyTogether(), buyTogether.buyBuyTogether(), $(".productBuyTogether").fadeIn(400)
        }, 4e3)))
    }
},
prodsDetails = [],
buyTogether = {
    buildBuyTogether: function() {
        var btHtml = $("#divCompreJunto").html();
        $(".productBuyTogether").html(btHtml), $("a#lnkComprar").text("Comprar Junto"), $(".productBuyTogether").each(function() {
            var thisTr = $(this),
                u = $(this).find("a#lnkComprar").attr("href");
            u = u.substring(u.indexOf("?"));
            var urlParams;
            (window.onpopstate = function() {
                var match, pl = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function(s) {
                        return decodeURIComponent(s.replace(pl, " "))
                    },
                    query = u;
                for (urlParams = {}; match = search.exec(query);) urlParams[decode(match[1])] = decode(match[2])
            })();
            var tdTable, idProds = [];
            $.when($.ajax({
                url: "/produto/sku/" + urlParams["?sku"],
                async: !1
            }).done(function(data) {
                idProds.push(data[0].IdProduct), thisTr.find(".itemA").attr("data-idprod", data[0].IdProduct)
            }), $.ajax({
                url: "/produto/sku/" + urlParams.sku,
                async: !1
            }).done(function(data) {
                idProds.push(data[0].IdProduct), thisTr.find(".itemB").attr("data-idprod", data[0].IdProduct)
            })).then(function() {
                $.getScript("//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js").done(function(script, textStatus) {
                    $.each(idProds, function(i) {
                        vtexjs.catalog.getProductWithVariations(idProds[i]).done(function(product) {
                            tdTable = thisTr.find(".itemA").attr("data-idprod") == product.productId ? thisTr.find(".itemA") : thisTr.find(".itemB");
                            var html = "";
                            $.each(product.skus, function(i) {
                                if (product.skus[i].available) return x = i, !1
                            }), price = '<div class="price">', product.skus[x].listPrice > product.skus[x].bestPrice ? price += '<span class="old-price">' + product.skus[x].listPriceFormated + '</span><span class="best-price">' + product.skus[x].bestPriceFormated + "</span>" : price += '<span class="best-price">' + product.skus[x].bestPriceFormated + "</span>", price += "</div>", tdTable.find("h3").wrap("<div class='contSide'></div>").find("a").text(product.name);
                            var $title = tdTable.find("h3").clone();
                            html += "<h3>" + $title.html() + "</h3>", html += price, tdTable.find("img").attr("src", product.skus[x].image.replace("90-90", "300-300")), product.dimensions.length > 0 && product.skus.length > 1 ? ($.each(product.dimensions, function(i) {
                                html += '<div class="select-' + product.dimensions[i] + '"><select id="' + product.dimensions[i] + '">', product.dimensionsMap[product.dimensions[i]].length > 1 ? (html += '<option value=""  selected="true" disabled="disabled">Escolha ' + product.dimensions[i] + "</option>", $.each(product.dimensionsMap[product.dimensions[i]], function(x) {
                                    html += '<option value="' + product.dimensionsMap[product.dimensions[i]][x] + '">' + product.dimensionsMap[product.dimensions[i]][x] + "</option>"
                                })) : html += '<option selected="true" disabled="disabled" value="' + product.dimensionsMap[product.dimensions[i]][x] + '">' + product.dimensionsMap[product.dimensions[i]][x] + "</option>", html += "</select></div>"
                            }), tdTable.find(".contSide").html(html)) : tdTable.attr("data-sku", product.skus[0].sku), prodsDetails.push(product)
                        })
                    })
                }).fail(function(jqxhr, settings, exception) {})
            })
        }), $(".productBuyTogether h4").each(function() {
            $(this).html("Compre Junto")
        })
    },
    changeSkuBuyTogether: function() {
        $(".productBuyTogether .contSide").on("change", "select", function() {
            console.log("Mudou");
            var skuSelect = "{",
                thisElem = $(this);
            if ($.each(prodsDetails, function(i) {
                    prodsDetails[i].productId == thisElem.parents('[class^="item"]').attr("data-idprod") && (w = i)
                }), i = 0, $(this).parents('[class^="item"]').find("select").each(function() {
                    return "" != $(this).find("option:selected").val() && (tId = $(this).attr("id"), tVal = $(this).find("option:selected").val(), skuSelect += '"' + tId + '": "' + tVal + '",', i++, void 0)
                }), skuSelect += "}", $(this).parents('[class^="item"]').find("select").length == i) {
                skuSelect = skuSelect.replace(",}", "}");
                var obj = jQuery.parseJSON(skuSelect);
                $.each(prodsDetails[w].skus, function(i) {
                    if (JSON.stringify(obj) == JSON.stringify(prodsDetails[w].skus[i].dimensions)) {
                        if (console.log(prodsDetails[w].skus[i]), prodsDetails[w].skus[i].available) return thisElem.parents('[class^="item"]').attr("data-sku", prodsDetails[w].skus[i].sku), thisElem.removeClass("inactive"), !1;
                        alert("Infelizmente esta combinação está Indisponível.")
                    } else thisElem.parents('[class^="item"]').attr("data-sku", ""), thisElem.addClass("inactive")
                })
            }
        })
    },
    buyBuyTogether: function() {
        $(".productBuyTogether .buy .comprar-junto a").on("click", function(event) {
            event.preventDefault();
            var sku1 = ($(this).attr("href"), $(this).parents('[class^="productBuyTogether"]').find(".itemA").attr("data-sku")),
                sku2 = $(this).parents('[class^="productBuyTogether"]').find(".itemB").attr("data-sku");
            "" == sku1 || "" == sku2 || "undefined" == typeof sku1 || "undefined" == typeof sku2 ? alert("Está faltando você especificar algum produto") : ($(this).text("Aguarde..."), $.ajax({
                url: "/checkout/cart/add?sku=" + sku1 + "&qty=1&seller=1&sku=" + sku2 + "&qty=1&seller=1&redirect=false&sc=1",
                type: "GET",
                crossDomain: !0,
                dataType: "html",
                success: function() {
                    setTimeout(function() {
                        window.location = window.location = "https://" + window.location.hostname + "/checkout/#/cart"
                    }, 1e3)
                },
                error: function() {
                    $(this).text("Comprar junto")
                }
            }))
        })
    }
},
kit = {
    precoTotal: function() {
        var totalKit = 0;
        $(".productIten").each(function() {
            if (!$(this).hasClass("inactive")) {
                var bestPrice = $(this).find(".skuBestPrice");
                bestPrice.each(function() {
                    totalKit += parseFloat($(this).text().replace("R$ ", "").replace(",", "."))
                })
            }
        }), $(".totalKit .preco em").html("R$ " + totalKit.toFixed(2).replace(".", ","))
    },
    removeProd: function() {
        $(".productIten").each(function() {
            $(this).find(".buy-in-page-button").length > 0 && $(this).find(".removeProd").show(), $(".removeProd input").on("change", function() {
                $(this).is(":checked") ? $(this).parents(".productIten").addClass("inactive") : $(this).parents(".productIten").removeClass("inactive"), kit.precoTotal()
            })
        })
    },
    quantidade: function() {
        var selectQnt = '<div class="qtd"><span>Quantidade:</span><select class="selectQtd" name="quant" value="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>';
        $(".productItem").each(function() {
            var $this = $(this);
            $this.find(".buy-in-page-button").length > 0 && ($this.find(".price").append(selectQnt), $this.find(".selectQtd").on("change", function() {
                var quant = $this.find("option:selected").val(),
                    bSku = $this.find(".buy-in-page-button").attr("href").split("=")[1].split("&")[0];
                console.log(bSku), $this.find(".buy-in-page-button").attr("href", "/checkout/cart/add?sku=" + bSku + "&qty=" + quant + "&seller=1&redirect=false&sc=1")
            }))
        })
    },
    comprarLookCompleto: function() {
        $(".totalKit .finalizaKit").bind("click", function() {
            var indexInList = 0,
                productActive = 0,
                productCheck = 0,
                objectKit = [];
            if ($.each($(".productIten"), function(index, value) {
                    var urlTest = ["javascript", ":", "alert('Por favor, selecione o modelo desejado.');"].join(""),
                        url = $(".productIten").eq(index).find(".buy-in-page-button").attr("href");
                    if (!$(".productIten").eq(index).hasClass("inactive"))
                        if (productActive++, 0 == $(".productIten").eq(index).find('input.item_unavaliable[checked="checked"]').length) {
                            $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("unavailable");
                            $(".productIten").eq(index).find(".buy-in-page-button").each(function() {
                                if (url == urlTest) {
                                    $(".productIten").eq(index).find(".buy-in-page-button").parent().addClass("required");
                                    return !1
                                }
                                objectKit[indexInList] = new Object, objectKit[indexInList].url = url, $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("unavailable"), $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("required"), objectKit[indexInList].sku = url.split("sku=")[1].split("&")[0], objectKit[indexInList].skuUrl = "sku=" + objectKit[indexInList].sku + "&qty=1&seller=1&", indexInList++, productCheck++
                                
                            })
                        } else $(".productIten").eq(index).find(".buy-in-page-button").parent().addClass("unavailable")
                }), console.log(productCheck + " / " + productActive), console.log(objectKit), productCheck == productActive) {
                for (var ajaxUrl = "/checkout/cart/add?", i = 0; i < objectKit.length; i++) ajaxUrl += objectKit[i].skuUrl;
                
                ajaxUrl += "redirect=false&sc=1", $.ajax({
                    url: ajaxUrl,
                    type: "GET",
                    crossDomain: !0,
                    dataType: "html",
                    success: function() {
                        helper.fillCart(), helper.modalComfirm()
                    }
                })
               
                               
            } else alert("Por favor, selecione o modelo desejado dos produtos que desejar.")
        })
    },
    miniFoto: function(indice) {
        var miniFotoSize = "80-80";
        $(".productIten").each(function() {
            var self = $(this),
                idProdStr = $(this).find(".sku-selector-container ul").attr("class");
            idProdStr = idProdStr.substring(idProdStr.indexOf("productid"), idProdStr.length), idProdStr = idProdStr.split(" ")[0], idProdStr = idProdStr.split("-")[1], self.attr("id", "mini-foto-" + idProdStr), vtexjs.catalog.getProductWithVariations(idProdStr).done(function(product) {
                self.find(".thumb").attr("src", product.skus[indice].image.replace("400-600", miniFotoSize))
            }), $(this).find(".item-dimension-Cor input").each(function() {
                $(this).on("click", function() {
                    console.log("a");
                    var newImage = $(this).next("label").attr("data-img").replace("60-60", miniFotoSize);
                    $("#mini-foto-" + idProdStr + " .thumb").attr("src", newImage)
                })
            })
        })
    },
    removeEmptyIten: function() {
        $(".productIten").each(function() {
            "" === $(this).find("h4").html() ? ($(this).next(".sepSection").remove(), $(this).remove()) : $(this).show().css("display", "table")
        })
    },
    init: function() {
        setInterval(kit.precoTotal(), 1e3), kit.comprarLookCompleto(), kit.removeProd(), kit.removeEmptyIten(), kit.miniFoto(0)
    }
},
institutional = {
    linkSidebar: function() {
        $(".institutionalLinks li a").each(function() {
            var link = $(this).attr("href"),
                url = window.location.pathname.toLowerCase();
            link == url && $(this).addClass("current")
        })
    },
    init: function() {
        institutional.linkSidebar()
    }
},
account = {
    bildModal: function() {
        $("#editar-perfil").css("display", "none"), $("#address-edit").css("display", "none"), $("#address-remove").css("display", "none"), $("#edit-data-link").attr({
            rel: "modal:open"
        }), $(".address-update").attr({
            rel: "modal:open"
        }), $("#address-update").each(function() {
            $(this).attr({
                rel: "modal:open"
            })
        }), $(".delete").each(function() {
            $(this).attr({
                rel: "modal:open"
            })
        }), $(".modal-footer").each(function() {
            $(this).append('<a href="#close-modal" rel="modal:close" class="btn-link">Cancelar</a>')
        })
    },
    init: function() {
        account.bildModal()
    }
},
stores = {
    mapModal: function() {
        $(".linkMap").on("click", function(e) {
            if (!fns.isMobile()) {
                e.preventDefault();
                var mapUrl = $(this).attr("data-modal"),
                    modalUrl = $("#modalLojas .mapa iframe").attr("src");
                mapUrl != modalUrl && $("#modalLojas .mapa iframe").attr("src", mapUrl), $("#modalLojas").show(), $("#modalLojas .overlay").fadeIn(), setTimeout(function() {
                    $("#modalLojas .mapa").fadeIn()
                }, 250)
            }
        }), $("#modalLojas .closeModal, #modalLojas .overlay").live("click", function() {
            stores.closeModal()
        })
    },
    closeModal: function() {
        $("#modalLojas").fadeOut(), $("#modalLojas .overlay").fadeOut(), $("#modalLojas .mapa").fadeOut()
    },
    init: function() {
        stores.mapModal()
    }
},
revendedor = {
    init: function() {
        $("#juridica").change(function() {
            $("#cnpj").mask("00.000.000/0000-00")
        }), $("#fisica").change(function() {
            $("#cnpj").mask("000.000.000.00")
        }), $("#cep").mask("00000-000"), $("#dataNasc").mask("00/00/0000"), $("#celular").mask("(00) 00000-0000"), $("#btn_enviar").click(function(e) {
            var nome = $("#nome").val(),
                email = $("#email").val(),
                sobrenome = $("#sobrenome").val(),
                genero = $("#sexo").val(),
                cnpj = $("#cnpj").val(),
                celular = $("#celular").val(),
                genero = $("#sexo").val(),
                dataNasc = $("#dataNasc").val(),
                cidade = $("#cidade").val(),
                estado = $("#estado").val(),
                cep = $("#cep").val(),
                cnpj = $("#cnpj").val(),
                pessoa = $("input:radio[name=type]:checked").val(),
                news = $("input:checkbox[name=news]").is(":checked"),
                whatsapp = $("input:checkbox[name=whatsapp]").is(":checked"),
                jsonData = {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    celular: celular,
                    sexo: genero,
                    cnpj: cnpj,
                    celular: celular,
                    dataNasc: dataNasc,
                    cidade: cidade,
                    estado: estado,
                    cep: cep,
                    cnpj: cnpj,
                    pessoa: pessoa,
                    news: news,
                    whatsapp: whatsapp
                };
            e.preventDefault(), $.ajax({
                type: "POST",
                url: "https://api.vtexcrm.com.br/edexjeans/dataentities/RV/documents/",
                async: !0,
                dataType: "json",
                data: JSON.stringify(jsonData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                success: function(data) {
                    e.preventDefault(), alert("Cadastrado com sucesso!")
                },
                beforeSend: function() {
                    console.log(jsonData)
                },
                complete: function() {
                    console.log("enviou!!!")
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    erro = JSON.parse(xhr.responseText), alert(erro.Message), e.preventDefault()
                }
            })
        })
    }
},
faleConosco = {
    init: function() {
        $("#tel").mask("(00) 0000-0000"), $("#btn_enviar").click(function(e) {
            var nome = $("#nome").val(),
                email = $("#email").val(),
                tel = $("#tel").val(),
                msg = $("#msg").val(),
                jsonData = {
                    nome: nome,
                    email: email,
                    tel: tel,
                    msg: msg
                };
            e.preventDefault(), $.ajax({
                type: "POST",
                url: "https://api.vtexcrm.com.br/edexjeans/dataentities/CT/documents/",
                async: !0,
                dataType: "json",
                data: JSON.stringify(jsonData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                success: function(data) {
                    e.preventDefault(), alert("Mensagem enviada com sucesso!")
                },
                beforeSend: function() {
                    console.log(jsonData)
                },
                complete: function() {
                    console.log("enviou!!!")
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    erro = JSON.parse(xhr.responseText), alert(erro.Message), e.preventDefault()
                }
            })
        })
    }
};
$(document).ready(function() {
$(".helperComplement").remove(), global.init(), $("body").hasClass("home") && (home.init(), $(window).load(function() {
    slider.fullSlider(), slider.shelfSlider(!1, !0, 6, 6, 4, 4, 2, 2), $(".countSlider").countSlider(!1, !0, !0, 1, 1, 1, 1, 1, 1)
})), $("body").hasClass("product") && (! function(o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    o.zoom = function(t, n, e, i) {
        var u, c, a, r, m, l, s, f = o(t),
            h = f.css("position"),
            d = o(n);
        return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative", t.style.overflow = "hidden", e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: e.width * i,
            height: e.height * i,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(t), {
            init: function() {
                c = f.outerWidth(), u = f.outerHeight(), n === t ? (r = c, a = u) : (r = d.outerWidth(), a = d.outerHeight()), m = (e.width - c) / r, l = (e.height - u) / a, s = d.offset()
            },
            move: function(o) {
                var t = o.pageX - s.left,
                    n = o.pageY - s.top;
                n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, r), 0), e.style.left = t * -m + "px", e.style.top = n * -l + "px"
            }
        }
    }, o.fn.zoom = function(n) {
        return this.each(function() {
            var e = o.extend({}, t, n || {}),
                i = e.target && o(e.target)[0] || this,
                u = this,
                c = o(u),
                a = document.createElement("img"),
                r = o(a),
                m = "mousemove.zoom",
                l = !1,
                s = !1;
            if (!e.url) {
                var f = u.querySelector("img");
                if (f && (e.url = f.getAttribute("data-src") || f.currentSrc || f.src), !e.url) return
            }
            c.one("zoom.destroy", function(o, t) {
                c.off(".zoom"), i.style.position = o, i.style.overflow = t, a.onload = null, r.remove()
            }.bind(this, i.style.position, i.style.overflow)), a.onload = function() {
                function t(t) {
                    f.init(), f.move(t), r.stop().fadeTo(o.support.opacity ? e.duration : 0, 1, !!o.isFunction(e.onZoomIn) && e.onZoomIn.call(a))
                }

                function n() {
                    r.stop().fadeTo(e.duration, 0, !!o.isFunction(e.onZoomOut) && e.onZoomOut.call(a))
                }
                var f = o.zoom(i, u, a, e.magnify);
                "grab" === e.on ? c.on("mousedown.zoom", function(e) {
                    1 === e.which && (o(document).one("mouseup.zoom", function() {
                        n(), o(document).off(m, f.move)
                    }), t(e), o(document).on(m, f.move), e.preventDefault())
                }) : "click" === e.on ? c.on("click.zoom", function(e) {
                    return l ? void 0 : (l = !0, t(e), o(document).on(m, f.move), o(document).one("click.zoom", function() {
                        n(), l = !1, o(document).off(m, f.move)
                    }), !1)
                }) : "toggle" === e.on ? c.on("click.zoom", function(o) {
                    l ? n() : t(o), l = !l
                }) : "mouseover" === e.on && (f.init(), c.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(m, f.move)), e.touch && c.on("touchstart.zoom", function(o) {
                    o.preventDefault(), s ? (s = !1, n()) : (s = !0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(o) {
                    o.preventDefault(), f.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(o) {
                    o.preventDefault(), s && (s = !1, n())
                }), o.isFunction(e.callback) && e.callback.call(a)
            }, a.src = e.url
        })
    }, o.fn.zoom.defaults = t
}(window.jQuery), product.init(), $(window).load(function() {
    product.doubleZoom(), slider.shelfSlider(!1, !0, 6, 6, 4, 4, 2, 2), slider.shelfSimilar(!1, !0, 3, 3, 4, 4, 2, 2)
})), $("body").hasClass("kit") && kit.init(), $("body").hasClass("catalog") && catalog.init(), $("body").hasClass("emptySearch") && (catalog.emptySearch(), $(window).load(function() {
    slider.shelfSlider(!1, !0, 6, 6, 4, 4, 2, 2)
})), $("body").hasClass("institutional") && institutional.init(), $("body").hasClass("stores") && stores.init(), $("body").hasClass("account") && account.init(), $("body").hasClass("dealer") && revendedor.init(), $("body").hasClass("fale-conosco") && faleConosco.init()
}), $(window).load(function() {
$(window).resize(function() {
    fns.verifyWidth()
})
}), $(document).ajaxStop(function() {
$(".helperComplement").remove()
}), $.fn.countSlider = function(play, dots, arrows, toShowInitial, toScrollInitial, toShow_T, toScroll_T, toShow_M, toScroll_M) {
function countPages() {
    var divider = toShowInitial,
        param = that.slick("getSlick");
    null !== param.activeBreakpoint && (divider = param.breakpointSettings[param.activeBreakpoint].slidesToScroll), totalSlideMath = param.slideCount / divider, totalSlideMath = Math.ceil(totalSlideMath), that.append('<div class="slideNumbers"><div class="numbers"><span class="slideNumbersItem current">1</span><span class="slideNumbersItem sep">/</span><span class="slideNumbersItem">' + totalSlideMath + "</span></div></div>");
    that.find(".slideNumbers")
}
var that = $(this);
$(this).slick({
    infinite: !0,
    autoplay: play,
    centerMode: !1,
    dots: dots,
    arrows: arrows,
    slidesToShow: toShowInitial,
    slidesToScroll: toScrollInitial,
    vertical: !1,
    speed: 1e3,
    autoplaySpeed: 5e3,
    dotsClass: "custom_paging",
    customPaging: function(slider, i) {
        return i + 1
    },
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: toShow_T,
            slidesToScroll: toScroll_T
        }
    }, {
        breakpoint: 720,
        settings: {
            slidesToShow: toShow_M,
            slidesToScroll: toScroll_M
        }
    }]
}), countPages(), that.on("afterChange", function(event, slick, currentSlide, nextSlide) {
    var pagecurrent = that.parent().find(".custom_paging .slick-active").text();
    that.parent().find(".slideNumbersItem.current").text(pagecurrent)
}), that.on("breakpoint", function(event, slick, breakpoint) {
    $(this).parent().find(".slideNumbers").remove(), countPages()
})
};






    $(".vtexIdUI .modal-header .close", "body").click(function(){
      window.location.href = "/";
 });
 
 