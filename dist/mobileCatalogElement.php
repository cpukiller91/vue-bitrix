<? /** В этот файл инжектится JS с хешем, подключать из папки src */
$asset = \Bitrix\Main\Page\Asset::getInstance();
?>

<? $asset->addCss('/local/webpack/dist/mobileCatalogElement.6f4232c3a4e214bef494.css'); ?>


<? $asset->addJs('/local/webpack/dist/0.6f4232c3a4e214bef494.js'); ?>

<? $asset->addJs('/local/webpack/dist/mobileCatalogElement.6f4232c3a4e214bef494.js'); ?>

