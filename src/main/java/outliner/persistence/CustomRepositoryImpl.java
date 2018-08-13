package outliner.persistence;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

public class CustomRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
		implements CustomRepository<T, ID> {
	private final EntityManager em;
	private JpaEntityInformation entityInformation;

	public CustomRepositoryImpl(JpaEntityInformation entityInformation, EntityManager em) {
		super(entityInformation, em);
		this.entityInformation = entityInformation;
		this.em = em;
	}

//	@Transactional
//	public void refresh(T t) {
//		em.refresh(t);
//	}

	@Override
	@Transactional
	public T saveFlushAndRefresh(T entity) {
		entity = super.saveAndFlush(entity);
		em.refresh(entity);
		return entity;
	}
	
	@Override
	@Transactional
	public <S extends T> S saveAndFlush(S entity) {

		S result = super.saveAndFlush(entity);

		return result;
	}
	
	@Override	
	@Transactional
	public <S extends T> S save(S entity) {
		return super.save(entity);
	}
	
	public List<T> findAll() {
		return super.getQuery(null, Sort.unsorted()).getResultList();
	}
	
	public Page<T> findAll(Pageable pageable) {
		return super.findAll((Specification<T>) null, pageable);
	}
	
	@Override
	public T getOne(ID id) {
		// TODO Auto-generated method stub
		return super.getOne(id);
	}

	
}