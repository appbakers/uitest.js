uitest.define('run/feature/mobileViewport', ['run/eventSource'], function(eventSource) {
    eventSource.on('addAppends', function(event, done) {
        event.handlers.push(install);
        done();
    });

    function install(window) {
        var doc = window.document,
            topDoc = window.top.document,
            viewportMeta = findViewportMeta(doc),
            topViewportMeta = findViewportMeta(topDoc),
            newMeta;
        if (topViewportMeta) {
            topViewportMeta.parentNode.removeChild(topViewportMeta);
        }

        if (viewportMeta) {
            newMeta = topDoc.createElement("meta");
            newMeta.setAttribute("name", "viewport");
            newMeta.setAttribute("content", viewportMeta.getAttribute("content"));
            topDoc.getElementsByTagName("head")[0].appendChild(newMeta);
        }
    }

    function findViewportMeta(doc) {
        var metas = doc.getElementsByTagName("meta"),
            meta,
            i;
        for (i=0; i<metas.length; i++) {
            meta = metas[i];
            if (meta.getAttribute('name')==='viewport') {
                return meta;
            }
        }
        return null;
    }
});