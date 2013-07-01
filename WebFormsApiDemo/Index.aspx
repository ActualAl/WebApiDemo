<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="WebFormsApiDemo.Index" MasterPageFile="~/Site.Master" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolder1" ID="Content1" runat="server">
<h2>The wild wild west</h2>

<h3>User stories</h3>

<p><span style="text-decoration:underline">Story 1:</span> View list of customers</p>
<p><span style="text-decoration:underline">Narrative: </span>
    <ul>
        <li>As a user</li>
        <li>when I load customers page I will see a list of customers</li>
        <li>so that I can view our companies customers</li>
    </ul>
</p>
<p><span style="text-decoration:underline">Acceptance criteria: </span>
    <ul>
        <li>Given: A a link to the customers page</li>
        <li>When: The link is clicked</li>
        <li>Then: I see a list of customers</li>
    </ul>
</p>
<hr />
<p><span style="text-decoration:underline">Story 2:</span> View customer detail</p>
<p><span style="text-decoration:underline">Narrative: </span>
    <ul>
        <li>As a user</li>
        <li>when I click on a customer I will see that customers detail</li>
        <li>so that I can view that customers record</li>
    </ul>
</p>
<p><span style="text-decoration:underline">Acceptance criteria: </span>
    <ul>
        <li>Given: A a list of customers </li>
        <li>When: I click on a customer</li>
        <li>Then: I see the customers record</li>
    </ul>
</p>
<hr />

<ul>
    <li><a href="TheGood.aspx">View Customers (The Good)</a></li> 
    <li><a href="TheBadAndTheUgly.aspx">View Customers (The Bad and the Ugly)</a></li>  
</ul>

</asp:Content>
