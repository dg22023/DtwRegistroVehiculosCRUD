# Manual de Instalación y Configuración de Windows Server 2022 y Servidor de Archivos

## 1. Configuración Inicial del Servidor

### Cambio de Nombre del Servidor
En Windows Server 2022, se debe acceder a **Server Manager** y posteriormente a la sección **Local Server**, donde se modificará el nombre predeterminado del equipo por **SERVER01** ![1](https://lh3.googleusercontent.com/sitesv/AA5AbUBCEHn-MOuaNsTlZxCcoybZLOmU9z1mVBILVNT6NdIHR-wnQnMIyY6NV58MY75A9-39kfhC7vK61vr0ou1_X4tnKNu9HweevNnYYLYmDxXFZgsR8c8jqsJkktHTbn0306S764dth7zoi2snZDhUhrCoK3-fTwI-5ksGyKLtQvmu8Plwt1ZQfSJMDk2i40gPdPCifcfI4hDAu-pt7xqhI6UjMlW90VY4I-Ma=w1280).   
Finalmente, se debe reiniciar el servidor para aplicar correctamente los cambios realizados.

### Configuración de Red Interna en VirtualBox
1. Apague la máquina virtual del servidor.
2. En VirtualBox, seleccione la máquina virtual **SERVER01** y acceda a **Configuración → Red/Network** ![2](https://lh3.googleusercontent.com/sitesv/AA5AbUBRDCpx-VKZXxmphCXOv9vkzMa3HSO6hlbChNeLK-hO77QDQbMlixAk3QJwOONjND7RFJaCcGoP0Dqk9FmeQOZPNGT7wm8sqbLZPOLEERiyG1WSWhfyq0TrtaL76mf5l2VEiPdItT5vUZhGlY4XQmyz_1zNcNp4Pc2VLuzLZVW2I2xo-cBPCeejg6sxozI0S0obtnhgL6PPDGUGIJPv2SmGs_zE88RHerEZZ2Q=w1280).
3. En el **Adaptador 1**, configure los siguientes parámetros:
   - **Habilitar adaptador de red:** Activado.
   - **Conectado a:** Red interna.
   - **Nombre:** LAB-SERVER.
4. Guarde los cambios y encienda nuevamente la máquina virtual.

### Configuración de Dirección IP Estática
Una vez iniciado Windows Server 2022, abra **Server Manager** y diríjase a **Local Server** .Seleccione la dirección IPv4 actual para abrir la configuración de red y asigne manualmente los siguientes parámetros:![3](https://lh3.googleusercontent.com/sitesv/AA5AbUDAthk1ynslsFRQj3Q5UCjnW0D7P9gyhVmymbsiCz3F48Sj16f51ti5Rv03pBa-1ETUYzLL3LgzY9_0hAHmNmoRWuvbMbQERnV5Uhw1ByfveHp_VB-Lo4nYsBpKPXg26WiuK2AhRSrKK4Lgut58oiRH9wOBiqs31CQQaZdY62LB6jmRrbJ7eY0BbHpiy8qn7Vncf4ifpVHUnqjYUybZ3e5CeWv8IKVMTxxr=w1280)

| Configuración | Valor |
| --- | --- |
| Dirección IP | 192.168.10.10 |
| Máscara de subred | 255.255.255.0 |
| Puerta de enlace | 192.168.10.1 |
| DNS preferido | 192.168.10.10 |

Guarde la configuración y verifique la conectividad de red.

---

## 2. Instalación del Rol de Servidor de Archivos (File Server)

Este rol permite administrar recursos compartidos dentro de la red y gestionar el acceso a archivos mediante permisos definidos para usuarios y grupos específicos.![4](https://lh3.googleusercontent.com/sitesv/AA5AbUBCiwaEkhQu9dsJqRkAImN-iZsTbh80Uo1SenyHHlef1zVrVSbbKLQ0tydXcdiyksQNI2HVyk-EFjSFkS5qSlVilqBc0xnUZ9j0nzwksXfbeofXkWxlc34rBvlVuY4KOG6VXRHUGBMUUQ6SLX1RLg2M4Y-knWSHZgH04824UmZlDYhRTbUr17rf-XipAV4rE1E6RR_IpyAPAUHYeDVFB9CjYy1NH6GKwB-N2Ds=w1280)

**Procedimiento:**
1. Abrir **Server Manager** y seleccionar **Manage → Add Roles and Features**.
2. En el asistente, presionar **Next**.
3. Seleccionar la opción **Role-based or feature-based installation** y presionar **Next**.
4. Seleccionar el servidor **SERVER01**.![5](https://lh3.googleusercontent.com/sitesv/AA5AbUB9lY6kOeyP8NqkrXBugwT6JSLrquepNTZQcM6tytrSktq5ek_SSC8_FfcBoBNMBLaXWHCetwRctKyhuh-Rh3u_sZEn4Luh5pLVxtS2rI4pxm9JZRVYbXqfmWe2U8eTQtx57OLNUbhnwVV6vX0tPSJMbr474tX0_z8fImc_jRyZZ4sjcYpd4bnrhxgbAX2dUBAPhtBu0uWHOvZemzA1vFkk2tAfRv6TgDBqlKQ=w1280)
5. En la sección **Server Roles**, expandir **File and Storage Services**, y luego **File and iSCSI Services**.
6. Activar la casilla de **File Server** y continuar presionando **Next** hasta llegar al botón **Install**.![6](https://lh3.googleusercontent.com/sitesv/AA5AbUDH_FC9N0KRaRaBXACiR9AF5mG-mR4pNMkG9RZB5xa_Cfexs2-vdwdj0fsbTfQqA4Mr724iYs7E95mUnHj746AC6aitRUi57INgbDvAg4di3B96kvuqUMFRd74RTQqpsJZmnD6rI1nMRl4jpaIApUkOrg0sR2_xGTEmzyhEH6qsemQhVX7N1vKtUcXeXTbwn2wJIfQqhDFStmgy1NcIt9cnj22PjLifUANg=w1280)
7. Esperar a que finalice la instalación.![7](https://lh3.googleusercontent.com/sitesv/AA5AbUCnUhYBuFfJD3cBhxKbiMVevDbDYiDCZl2vpHjWgiL-RimtoQXzhJ3q4k0p19WjZG8hAMChgoq0q23pwDUTQ_D3CmgUC5sF_iGaPB1zQ7bJFx0jSUcVrg7LxnzZh5a37zqogvXtSozAjrWHBbXJsYdsjokTzMtqCWtWZwrOpK0rnsJ2VWRfWLoQf_PsVfRTI0J5e4LGEvgzOQ3kYUYgsP24kmkToBZawleI=w1280)

---

## 3. Administración de Usuarios y Grupos Locales

Estas configuraciones permitirán controlar qué usuarios pueden acceder a determinadas carpetas compartidas y qué acciones podrán realizar.

### Creación de Usuarios Locales
Abra **Server Manager**, seleccione **Tools → Computer Management** y en el panel izquierdo acceda a **System Tools → Local Users and Groups → Users**.![8](https://lh3.googleusercontent.com/sitesv/AA5AbUAnmChcLhz9IZ8dxea6KD955w9cQQqSyc-F5zqQI3Edt5EX6PLhIPYD28cII3OsU7ahvRD9UncPjBW_JIJGoH-kR10VcfMnZ4A6pzmQl4qsynieaEic-OsOu9sivjHEz5m0S-egdq8PVabMEca50wOmpTN0KonC1IPBr0bdOaSv3OkmK7Q_NE0C65O164UFEA-0Dws8UPKTwnxwbLjfwIrtyj121wWAi7cm30o=w1280)
![9](https://lh3.googleusercontent.com/sitesv/AA5AbUCr4XTjR8mCgfKCgukLISfMxH7n9DiCgpIFVhr4-qrtFm0XzRxcLeTAVJczCBLeHclUBdh58s6H_nfvxNDqaxHzDVth_gPjiTDHCJmqMvWsib5ahcyldcwy4t2H2CArwxi2mX-sTzwh-Re0_6yuaEhLHsJosLFXtXaj-DNmY8kzBwWyjh8W5KavuKy9wabJ6U31BJ_8_uPIof_KUM-YrUdK8imnEq8gO4CuOME=w1280) 
Para crear cada usuario, haga clic derecho sobre **Users**, seleccione **New User** y complete la información. Active la opción **Password never expires** y desactive **User must change password at next logon**. ![9](https://lh3.googleusercontent.com/sitesv/AA5AbUCr4XTjR8mCgfKCgukLISfMxH7n9DiCgpIFVhr4-qrtFm0XzRxcLeTAVJczCBLeHclUBdh58s6H_nfvxNDqaxHzDVth_gPjiTDHCJmqMvWsib5ahcyldcwy4t2H2CArwxi2mX-sTzwh-Re0_6yuaEhLHsJosLFXtXaj-DNmY8kzBwWyjh8W5KavuKy9wabJ6U31BJ_8_uPIof_KUM-YrUdK8imnEq8gO4CuOME=w1280)
![10](https://lh3.googleusercontent.com/sitesv/AA5AbUDj6gkCuJnUIhhluf7Gv7Yp-d9aZdnDSh9bgzu_b9Qs-dDQP0aniggul0HugD5FQwYDqzrzLiRtdFFIrCOnRsgK6EfEvxeOKds2bJhJFBd4ihl21YJEM8d_RxaE-jz2olE9jpRtdB5FsmMkkYyl4u5AdofW7vWuNlfUQYe_QtJzuvKrm7O1rGQhDD3AWtLLc9Y3EveTR3Rrwx7kssZIxlevL4dft_bJ72mqHhA=w1280)

Se deben crear los siguientes usuarios con la contraseña `League2024$`:
- `juan`.
- `maria`.
- `adminfiles`.

### Creación de Grupos Locales
En la misma ventana de **Computer Management**, acceda a **System Tools → Local Users and Groups → Groups**. ![11](https://lh3.googleusercontent.com/sitesv/AA5AbUDjBUP6LqeBJKveHLx0nlJJqiPwwW8jb4Cw8azOn5pjhg4a1WXeVBZ8aJUged5sadQ3vBb3rwyK8c0cwfBK-nkhzbYMajGqqa-_9ioEKV1LidX6nzFDRE103A9k-4Qu06XvYldr--wWYNDH_2HLs4NyDO0-G8Ktf9OpC86ljZQAEeZScG74Q2HhhksG7KVHXyScBWtQJF_NjL54a-H1C-VVKnXb9IlwlzXPSyI=w1280) 
Haga clic derecho sobre **Groups**, seleccione **New Group** e ingrese el nombre correspondiente . Cree los grupos **Ventas**, **RRHH** y **Administradores**.
![12](https://lh3.googleusercontent.com/sitesv/AA5AbUC-ShoMH21G4jiojpPev2yFiuaNjhquctuCol113F7WizeMaGmvg5SHXSPGdg92ydVWlkohzFo3stbqQ6Lw7MbWFdqymbQ0ZRiycVPVPzesj84eSvVVVnB4wGJp5E6mJUqGVisgsSfqrdDOt3Z8W1_ZZv08YD8_O2I0BAcRGF_wujOEAzEM7ZrDuTMxTguiibj7b1kF8qGZgHDDPwz0snUqDtI_2Jol3A3bM1o=w1280)
![13](https://lh3.googleusercontent.com/sitesv/AA5AbUC5WsoLROqrbIguyi__VMrvyURb6XlRFDhY-R7MYOXbMAHdf7x7uAuujk_jIyet0UPWMrV6iSzRPR4DYrO8-sH_e5p_2Pd45wwrFSu-VW3hbI3i48axnV6PvgcWMpWL-9NvD6Z6yYj8kB4iWvTG1POPLIalo7BJTvuPF1knGJYugL3-xCbQqX-h-PllNwSbD1VbuK0upoRxItYPGONCoVEX5fqeMZYvjKDxPkU=w1280)
![14](https://lh3.googleusercontent.com/sitesv/AA5AbUAezpdMufElSUU27lUXs84yMP1hQ_ndHTHrsow8zrSWDp03Ka56yHT12su_4t8Zf3S7czGWmsoEro7ny30zrfozUABTScxiSwXsaZd5UvZfPhARQnl99eNiwCFAX8saqrc80YfZFuFPHFCuP9uiSUFg4DX7mMMooVdYX7Vodesjd4cmTkboG8xIh_5gMlVVmCD0X5KqgPhus8OSPTJbO23Cv81R6I6N_dAhRMk=w1280)

Para agregar los usuarios a los grupos, abra cada grupo creado, seleccione **Add**, escriba el nombre del usuario, confirme con **Check Names** y presione **OK** . La estructura debe quedar así:
- Grupo **Ventas**: Agregar usuario `juan`.
- Grupo **RRHH**: Agregar usuario `maria`.
- Grupo **Administradores**: Agregar usuario `adminfiles`.

---

## 4. Configuración de Carpetas Compartidas

Abra el explorador de archivos del servidor y, en la unidad principal (`C:\`), cree la carpeta base **Compartido** ![15](https://lh3.googleusercontent.com/sitesv/AA5AbUALMVCl51UxT76TXpOxljIqdgpfVZkJt0UlLIdcF0mxbP-SH--gHK2CXvl_r622vi8iLgrURlffxUwgtX4Ukgqg60cvDKd_0bHppJt6GTYoNoxBbGr6UZpJVC6KuFV00d69aah5NI0I6s-uy210vF5Hv0W95Lfda3ToDopkhlDEyEfDriLHozE4ej8vIaWFwn7T3u5R72Wx1W0EtIxHuC00SH6j7fgPaVXH6oY=w1280).  
Dentro de ella, cree las siguientes subcarpetas para tener esta estructura final:
- `C:\Compartido\Ventas`.
- `C:\Compartido\RRHH`.
- `C:\Compartido\General`.

### Asignación de Permisos de Red

1. **Carpeta Ventas**: Haga clic derecho sobre la carpeta **Ventas**, seleccione **Properties → Sharing → Advanced Sharing** y active **Share this folder** asignando el nombre **Ventas** ![16](https://lh3.googleusercontent.com/sitesv/AA5AbUBuJNjU1QPIJcFzdo1b1OV9JA6qccAzKZnuNUhGU6GOb_BwO5hXe453PSO2ix3Y-4dn1e4z5Kioajl_V0_wPdGY2fsLds-dbNHzNjRkxEbGIAcUhZT_zK87H0OnIgitzlpljdUDEO8xX8byAMsixCsnwurnR7-QscOO8zokuksFCw9kMAGSdKXRQxO_hnDipxMKIurz29__VtQwIgi1zNYux8i014Q1dchaXiQ=w1280).  
En **Permissions**, elimine el grupo **Everyone**, agregue el grupo **Ventas** y asígnele los permisos de **Read** y **Change**  
 ![17](https://lh3.googleusercontent.com/sitesv/AA5AbUAKKVmBxKTWPhUzBSjpzqjpLlDe6SzgIMMjdMcnvnzRpLg4KpsRy0XtraUc8eyaP-YIcuIrX0wfiv8KuAhroscrOsjmSoGZIdIMhrGKlmy4zotbRIC-B-4W69tBWZyJlCXZNmKY2b9GvWcvkXeU-k-9SHS28Q0_tZ2oDvrVbQ18ZPdzuBJ-g4_vygJUuuZVITbcRjIJKasMfQVYlcEb2-Injia7NOQ7aseb4Kg=w1280).
2. **Carpeta RRHH**: Repita el procedimiento anterior sobre la carpeta **RRHH**, pero autorizando únicamente al grupo **RRHH** con permisos de **Read** y **Change**.
3. **Carpeta General**: Configure esta carpeta permitiendo acceso únicamente de lectura para todos los usuarios creados  
 ![18](https://lh3.googleusercontent.com/sitesv/AA5AbUB9CyfA2qRjcmwP9_mqv6t3eEfjepgfbrqrgAYtrRaIA_XTjm26k39VEjZDL66Y55p28UDEzch-MmG-JFdoFqednP6lGFlh8_XOIZlUk5gvpDRmExWGXsv3p0zeMQ23GXG6gJOEXLgfNUt1yJfBMR9D402j0d8uVLny7p2UoXZnpPvWP8iFRcRE_0Raj_fCAbIuSmPigDFsdhIkXNrAv9mCEZ6RC2c6pqJs=w1280).

---

## 5. Configuración de la Máquina Cliente (Windows 10)

### Adaptador de Red y Dirección IP
Una vez instalada la máquina virtual con Windows 10, configure el adaptador de red en VirtualBox habilitándolo, conectándolo a la **Internal Network** y seleccionando el nombre de red **LAB-SERVER** 
![19](https://lh3.googleusercontent.com/sitesv/AA5AbUC6BR8ixpW2PUmZiYlEeaMx8jsaCkiSndIFLmnzavHSnTO6Z5e5tCVUOhOv-LbTs7shdWnE9oaf7t1AGVu9D7saudGHPFHmLEnytpy0wFxD_bOLMUZKL4LCKwqXflqyBMh6vEpNbkoDS8NPpU2OP7Hts-D7bbwU2Zv28BI14UdPL2JkW3Bt3g2LDF1KBo-4tm6q4oZcUUXfh3jYfwHbYNfODRsqEiNNT767IFs=w1280).

Posteriormente, asigne una dirección IP estática en Windows 10 para asegurar la comunicación con el servidor:  
![20](https://lh3.googleusercontent.com/sitesv/AA5AbUB33TGKzxiLtsSCkcYZyLrGXWrPDl_fExRknMf91gQ3gB5YqKPIptD6P6ImnNDGV5ci3KpnatIGQAyQJV3kyh0VmfIzQXVQSe3EFzS2Gu3bzWST2uypelitaubUnCuXR2D7YhmAhB6QrUCOQrwvO_yIm50KCzVtLBFhSobx1wv0J406Rki8FFd1PhWXty2UbqwTg0rIdAkqWS1Vnk-9YCxM39rINN1joNCgs98=w1280)
- **Dirección IP**: 192.168.10.20.
- **Máscara de subred**: 255.255.255.0.
- **Puerta de enlace**: 192.168.10.1.
- **DNS preferido**: 192.168.10.10.

Para comprobar la comunicación entre el cliente y el servidor, utilice el comando `ping 192.168.10.10`, el cual debe confirmar una conexión exitosa dentro de la red interna. 
 ![21](https://lh3.googleusercontent.com/sitesv/AA5AbUC3ZAs40LYXEyV4ck3U1fJK0Ey_KY6ypG1Wg4UkwA482h9J248BjnhIV_mIXFKmDzoEuTY7kLa_PhdNuM49sQwHVJ46WQcPoqjN_eahI3PxId6MaqOZrcaJAUmfeWm4txcCcCT9TCxW7Zyb_gmr8WtNSoPBO_qbRgssdfeiEXkmMrLipeetqzxoaFIvvGW_2RH9Jrz59-XvKlsoElgA6oBRbFNTajf564omB9M=w1280)

---

## 6. Pruebas Funcionales y Validación de Acceso

Con el objetivo de comprobar los permisos configurados, se deben realizar pruebas desde la máquina cliente (Windows 10) utilizando el Símbolo del Sistema. 

### Prueba de Acceso con el Usuario Juan
Autentique la sesión con el comando: 
`net use \\192.168.10.10 /user:SERVER01\juan`. 
![22](https://lh3.googleusercontent.com/sitesv/AA5AbUDZ-lvnOfNARoG11_l0N1w96JTuTyxyzk5HqP01P_fZJN1FTP1EHXZBoB7n5hO6qV67LpLJ_tlxuvpLyJGKVRIXuTwojpf7n-GpoZFI-gXKq59yMYa_67kvRxAiqMvso5QG_635YLzL-29xh8B9sEfw3knmcQ1TU9m-C8W5Y1LM1DBdtViLzRPEwcd0RsKEwTDTUHnRt9hfkfegl48tR5G1Tv_5ozVIcQQ9qyI=w1280)
Ingrese la contraseña `League2024$`. Al acceder a `\\192.168.10.10`, los resultados deben ser.  
![23](https://lh3.googleusercontent.com/sitesv/AA5AbUA1HjZaqWF84ajb4FFqKVUNT4ElARwPMmVhNYtLLEIWmG7zjfz81oSH5lV0nX6ofZBCiy423OSNrNtTRGWrtunDHz6DV2gWvbEHGPNyb1EUTFGzd2OcEjXiytrHeTXXNpCaBW7JjmujRn3ZrLVrnqGyTH0xcUMY9AMKqD6UIysSUaAmHtTLcIgtH4d2oKIoKJfBlZTQwvwj-DJmcUq-dK-4Q9N-GwpfbGYDZQg=w1280)
- **Ventas**: Acceso permitido (creación y modificación de archivos verificada).
- **General**: Acceso permitido.
- **RRHH**: Acceso denegado.  
![24](https://lh3.googleusercontent.com/sitesv/AA5AbUAONScn3urzan-bOviQdY8Mf-tz6DEoncRjS-jixhuwLLViW3OKt2PCVhzA8jgqbyAOnjWmVOjR68bYDHDMOBNV6Ksn4l2x_6R9ljcjSbyjf8dhFgU5oupsdAlQVQeb46HSZlE567oAvTe7kTdxVjhwKjakE6kDJ3mlXCtKFpH42tOMd34cNuZi42qTKstg_ZcxIS7xvobDUBg4v-TAZS7n3VmSrj62b8rw=w1280)

### Cierre de Sesiones SMB
Para evitar conflictos de autenticación antes de probar con otro usuario, finalice y limpie las conexiones persistentes ejecutando los siguientes comandos:
`net use \\192.168.10.10 /delete`.
`net use * /delete /y`.  
![25](https://lh3.googleusercontent.com/sitesv/AA5AbUBqHPhfHJ975vCFOE3vnsf8TJJ35mkyXqiCsqtO-Xot23yhO-AkQ-Jd3Xw5DhdYJKmQXF29g4pADkhUGRxl6qOfzla00oqwKZ4sFtHPjNJuPd3sEXIKQ5msWNXFNCg_ltQtENKTD0IzqvnVnloktQlNaumNSvf68LbGi89bGgiUR3CCkNHgYHrHKzfKFUpFdp_GmgCxhhyKwj3MlktkJqnuqIgOXhnPRLUEoZQ=w1280)

### Prueba de Acceso con el Usuario Maria
Realice una nueva conexión utilizando:
`net use \\192.168.10.10 /user:SERVER01\maria`.  
![26](https://lh3.googleusercontent.com/sitesv/AA5AbUBec09X0qryQDoVBJrvI-b-qA8oQekPw-YCtql6LlnEE2a6p4A5_BM9DEriQzIk9DNF0zsWhanXWo8dl_UjWV9Dkv4_gy7AstxiCmq51EgSkvXqM8broJfWNPZz1_Ai_G_B3-SafAP_pLktwmofCvYYjRHdUyCMY3fmx-e52ANZXZ1XHoP3jG6TAlWcbfcucWBV8xGRT8gHCD-kiI59RPpJuj4JWM0h-Ey4S6Y=w1280)
Después de ingresar la contraseña, valide los siguientes accesos:  
![27](https://lh3.googleusercontent.com/sitesv/AA5AbUClMZoYT5bt4l5W3KtQXQ-_Nr_wal8w4glJUodxnh9NOS6gPRFC55wIKh-flFzCTyS2TUKkkcWZEmSSQLDo2itTpS2OnFW5g5v_ho3UQepAzmAC8nTvV2PxjQLNAOPveX0XEHlATWbG7sJdh_Jf1JXJB4wcFeBt5Qk50vJWEnrC5Vxzj_1Zku0Bs5ti7shhRfua7fSDOWson8E_rT5sApTN2gGtuWRw0_kpf2M=w1280)
- **RRHH**: Acceso permitido (creación y modificación de archivos verificada).
- **General**: Acceso permitido.
- **Ventas**: Acceso denegado.
