<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TheGood.aspx.cs" Inherits="WebFormsApiDemo.TheGood" MasterPageFile="~/Site.Master" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolder1" ID="Content1" runat="server">
    <ul id="customerList">

    </ul>
    <script type="text/javascript" src="Scripts/customer/customerMvc.js"></script>
    <script type="text/javascript" src="Scripts/customer/customerPage.js"></script>
    <script type="text/javascript">
        var customerPage = new window.CustomerPage();
    </script>
</asp:Content>