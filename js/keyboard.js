
function KeyboardOpen( keyboard_type, target_keyboard ) {

	if( keyboard_type == "alpha_numeric" ) {
		
		document.getElementById( keyboard_alpha_numeric ).style.display = "block";
		document.getElementById( keyboard_numeric       ).style.display = "none";
		
		keyboard_control = "alpha_numeric";
		keyboard_active  = keyboard_alpha_numeric;
		keyboard_target  = target_keyboard;
		
	} else if( keyboard_type == "numeric" ) {
		
		document.getElementById( keyboard_alpha_numeric ).style.display = "none";
		document.getElementById( keyboard_numeric       ).style.display = "block";
		
		keyboard_control = "numeric";
		keyboard_active  = keyboard_numeric;
		keyboard_target  = target_keyboard;
		
	} else if( keyboard_type == "money" ) {
		
		document.getElementById( keyboard_alpha_numeric ).style.display = "none";
		document.getElementById( keyboard_numeric       ).style.display = "block";
		
		keyboard_control = "money";
		keyboard_active  = keyboard_numeric;
		keyboard_target  = target_keyboard;
		
	} else {
		
		alert("Keyboard failed !");
		return false;
		
	}
	
}

function EmuleKeyEnter( emule_key ) {
		
	if( keyboard_target != "" ) {
	
		document.getElementById( view_storage_values ).style.display = "block";
		document.getElementById( view_storage_values ).innerHTML     = document.getElementById( keyboard_target ).value;
	
	}

	return false;
	
}

function EmuleKeyBackspace( emule_key ) {
		
	// Corrige
	current_value     = document.getElementById( keyboard_target ).value;
	new_current_value = current_value.substring( 0, current_value.length - 1 );
	
	// Mostra o valor corrigido
	document.getElementById( keyboard_target ).value = new_current_value;
	
	// Formata o valor corrigido
	if( keyboard_control == "money" ) {
		
		MoneyFormat( keyboard_target, ".", ",", "backspace" );
		
	}

	return false;

}

function EmuleKeyClean( emule_key ) {
		
	document.getElementById( keyboard_target     ).value         = "";
	document.getElementById( view_storage_values ).innerHTML     = "";
	document.getElementById( view_storage_values ).style.display = "none";

	return false;
	
}

function EmuleKeyClose( emule_key ) {
		
	document.getElementById( keyboard_active ).style.display = "none";

	return false;
	
}

function EmuleKeyCapslock( emule_key ) {
	
	if( capslock_active == false ) {
	
		x = document.getElementsByClassName( capslock_elements );
		
		for( i = 0; i < x.length; i++ ) {
			
			x[i].style.textTransform = "uppercase";
			
		}
		
		capslock_active = true;
		
	} else {
	
		x = document.getElementsByClassName( capslock_elements );
		
		for( i = 0; i < x.length; i++ ) {
			
			x[i].style.textTransform = "lowercase";
			
		}
		
		capslock_active = false;
		
	}
	
	return false;
	
}

function EmuleKeyAlphaNumeric( emule_key ) {
		
	if( capslock_active == true ) {
		
		emule_key = emule_key.toUpperCase();
		
	}
	
	document.getElementById( keyboard_target ).value += emule_key;

	return false;
	
}

function EmuleKeyNumeric( emule_key ) {
		
	if( keyboard_control == "money" ) {
		
		MoneyFormat( keyboard_target, ".", ",", emule_key );
		
		
	} else {
	
		document.getElementById( keyboard_target ).value += emule_key;
		
	}

	return false;
	
}

function MoneyFormat( element_id, milhar_separator, decimal_separator, key_value ) {

    var sep           = 0;
    var key           = '';
    var i             = j    = 0;
    var len           = len2 = 0;
    var aux           = aux2 = '';
    var str_check     = '0123456789';
	var object_target = document.getElementById( element_id );
    
	key = key_value;
    
	// Correcao automatica quando apagado um digito
	if( key != "backspace" ) {
		
		if( str_check.indexOf( key ) == -1 ) return false;
		
	} else {
		
		key = "";
		
	}
    
	len = object_target.value.length;
	
    for( i = 0; i < len; i++ )
        if( ( object_target.value.charAt( i ) != '0' ) && ( object_target.value.charAt( i ) != decimal_separator ) ) break;
    aux = '';
	
    for(; i < len; i++)
        if( str_check.indexOf( object_target.value.charAt( i ) ) != -1 ) aux += object_target.value.charAt( i );
    
	aux += key;
    len = aux.length;
    
	if( len == 0 ) object_target.value = '';
    
	if( len == 1 ) object_target.value = '0'+ decimal_separator + '0' + aux;
    
	if( len == 2 ) object_target.value = '0'+ decimal_separator + aux;
    
	if( len > 2 ) {
		
        aux2 = '';
		
        for (j = 0, i = len - 3; i >= 0; i--) {
			
            if (j == 3) {
				
                aux2 += milhar_separator;
                j = 0;
				
            }
			
            aux2 += aux.charAt(i);
            j++;
			
        }
		
        object_target.value = '';
        len2 = aux2.length;
		
        for( i = len2 - 1; i >= 0; i-- )
        object_target.value += aux2.charAt(i);
        object_target.value += decimal_separator + aux.substr(len - 2, len);
		
    }
	
    return false;
	
}

function ChangeKeyboard( keyboard_type ) {
	
	// Tentando mudar para teclado alpha-numerico
	if( keyboard_type == "alpha_numeric" ) {
		
		// Nesse caso nao pode mudar, porque o controle diz apenas numeros no campo em questao
		if( keyboard_control != "numeric" && keyboard_control != "money" ) {
			
			document.getElementById( keyboard_alpha_numeric ).style.display = "block";
			document.getElementById( keyboard_numeric       ).style.display = "none";
			
			keyboard_active  = keyboard_alpha_numeric;
		
		}
	
	// Tentando mudar para teclado numerico
	} else if( keyboard_type == "numeric" || keyboard_type == "money" ) {
		
		document.getElementById( keyboard_alpha_numeric ).style.display = "none";
		document.getElementById( keyboard_numeric       ).style.display = "block";
		
		keyboard_active  = keyboard_numeric;
			
	} else {
		
		alert("Keyboard Failed !");
		return false;
	}
	
}

function ToggleFullScreen() {
	
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		
		if (document.documentElement.requestFullScreen) {
			
			document.documentElement.requestFullScreen();
			
		} else if (document.documentElement.mozRequestFullScreen) {
			
			document.documentElement.mozRequestFullScreen();
			
		} else if (document.documentElement.webkitRequestFullScreen) {
			
			document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			
		}
		
	} else {
		
		if (document.cancelFullScreen) {
			
			document.cancelFullScreen();
			
		} else if (document.mozCancelFullScreen) {
			
			document.mozCancelFullScreen();
			
		} else if (document.webkitCancelFullScreen) {
			
			document.webkitCancelFullScreen();
			
		}
		
	} 
	
}

// Desativando selecao de conteudo para evitar erros no uso do sistema

function disableselect(e){
    return false;
}

function reEnable(){
    return true;
}

document.onselectstart = new Function ("return false");

if( window.sidebar ) {

    document.onmousedown=disableselect;
    document.onclick=reEnable;
	
}

function WriteViewElement( element_id, data, append ) {
	
	document.getElementById( element_id ).style.display = "block";
	
	if( append == "append" ) {
		
		document.getElementById( element_id ).innerHTML += data;
		
	} else {
		
		document.getElementById( element_id ).innerHTML = data;
		
	}
	
}
