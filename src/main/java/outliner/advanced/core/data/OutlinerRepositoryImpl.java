package outliner.advanced.core.data;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.provider.PersistenceProvider;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

/**
 * Outliner repository implementation
 */
public class OutlinerRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
		implements OutlinerRepository<T, ID> {

	
	private static final Logger LOGGER = LoggerFactory.getLogger(OutlinerRepositoryImpl.class);
	
	/**
	 * The entity manager instance
	 */
	private final EntityManager em;

	private JpaEntityInformation<T, ?> entityInformation;
//	private final ProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
//	public OutlinerRepositoryImpl(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
//		super(entityInformation, entityManager);
//		
//		// TODO Auto-generated constructor stub
//	}

	private PersistenceProvider provider;
	
    public OutlinerRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.em = em;
    }

	public OutlinerRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
		Assert.notNull(entityInformation, "JpaEntityInformation must not be null!");
		Assert.notNull(entityManager, "EntityManager must not be null!");

		this.entityInformation = entityInformation;
		this.em = entityManager;
		this.provider = PersistenceProvider.fromEntityManager(entityManager);
	}
//	@Override
//	@Transactional
//	public <S extends T> S saveAndFlush(S entity) {
//		S result = save(entity);
//		flush();
//		em.refresh(entity);
//
//		return result;
//	}
	
	@Override
	@Transactional
	public <S extends T> S save(S entity) {
		if (entityInformation.isNew(entity)) {
			em.persist(entity);
			flush();
			em.refresh(entity);
			return entity;
		} else {
			S result = null;
			result = em.merge(entity);
			flush();
			em.refresh(entity);
			return result;
		}
	
		
	}
	
//	@Override
//	@Transactional
//	public <S extends T> S save(S entity) {
//		S result = save(entity);
//		flush();
//		em.refresh(entity);
//
//		return this.saveAndFlush(entity)result;
//	}

//	@Override
//	public <R> Page<R> findAllProjections(Specification<T> spec, Class<R> projectionType, Pageable pageable) {
//		TypedQuery<T> query = getQuery(spec, pageable);
//		return readPageWithProjection(spec, projectionType, pageable, query);
//	}
//
//	private <R> Page<R> readPageWithProjection(Specification<T> spec, Class<R> projectionType, Pageable pageable,
//			TypedQuery<T> query) {
//		Page<T> result = (pageable == null) ? new PageImpl<T>(query.getResultList()) : readPage(query, pageable, spec);
//		return result.map(item -> projectionFactory.createProjection(projectionType, item));
//	}
	
	@Override
	public T getOne(ID id) {

		return em.getReference(getDomainClass(), id);
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.springframework.data.repository.CrudRepository#findAll()
	 */
	public List<T> findAll(){
		return super.findAll();
	}

	/*
	 * (non-Javadoc)
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<T> findAll(Sort sort){
		return super.findAll(sort);
	}

	/*
	 * (non-Javadoc)
	 * @see org.springframework.data.repository.CrudRepository#findAll(java.lang.Iterable)
	 */
	public List<T> findAllById(Iterable<ID> ids){
		return super.findAllById(ids);
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#findAll(org.springframework.data.domain.Example)
	 */
	@Override
	public <S extends T> List<S> findAll(Example<S> example){
		return super.findAll(example);
	}

	/*
	 * (non-Javadoc)
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#findAll(org.springframework.data.domain.Example, org.springframework.data.domain.Sort)
	 */
	@Override
	public <S extends T> List<S> findAll(Example<S> example, Sort sort){
		return super.findAll(example, sort);
	}
}
